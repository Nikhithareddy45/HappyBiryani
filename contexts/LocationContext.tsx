// contexts/LocationContext.tsx
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationState, LocationContextValue } from "@/types/common";

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    isGranted: false,
    skipped: false,
    isInitializing: true,
  });

  // Initialize from AsyncStorage once
  useEffect(() => {
    (async () => {
      try {
        const [storedIsGranted, storedSkipped] = await Promise.all([
          AsyncStorage.getItem("isGranted"),
          AsyncStorage.getItem("skippedLocation"),
        ]);
        
        const isGranted = storedIsGranted === "true";
        const skipped = storedSkipped === "true";
        setLocation((prev) => ({
          ...prev,
          isGranted,
          skipped,
        }));

        if (isGranted) {
          const perm = await Location.getForegroundPermissionsAsync(); // [web:3]
          if (perm.status === "granted") {
            const loc = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Highest,
            }); // [web:3]
            setLocation((prev) => ({
              ...prev,
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            }));
          }
        }
      } catch (e) {
        console.log("Error loading location flags:", e);
      } finally {
        setLocation((prev) => ({ ...prev, isInitializing: false }));
      }
    })();
  }, []);

  // Ask for permission from the first page
  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync(); // [web:3]
      if (status !== "granted") {
        await AsyncStorage.setItem("isGranted", "false");
        setLocation((prev) => ({ ...prev, isGranted: false }));
        return false;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      }); // [web:3]
      await AsyncStorage.setItem("isGranted", "true");
      const value = await AsyncStorage.getItem("isGranted"); // string | null
      console.log("isGranted in AsyncStorage:", value);
      setLocation((prev) => ({
        ...prev,
        isGranted: true,
        skipped: false,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));
      return true;
    } catch (err) {
      console.log("Location permission error:", err);
    }
  };

  const skipLocation = async () => {
    try {
      await AsyncStorage.setItem("skippedLocation", "true");
    } catch (err) {
      console.log("Error saving skippedLocation:", err);
    }
    setLocation((prev) => ({ ...prev, skipped: true, isGranted: false }));
  };

  return (
    <LocationContext.Provider
      value={{ location, requestLocation, skipLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within a LocationProvider");
  return ctx;
};
