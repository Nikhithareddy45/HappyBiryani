import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  hasPermission: boolean;
  isLoading: boolean;
};

const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: any) => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    hasPermission: false,
    isLoading: false,
  });

  // --------------------------------------------------
  // LOAD CACHED LOCATION ON START
  // --------------------------------------------------
  useEffect(() => {
    loadStoredLocation();
  }, []);

  const loadStoredLocation = async () => {
    try {
      const stored = await AsyncStorage.getItem("USER_LOCATION");
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocation({
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          hasPermission: parsed.hasPermission,
          isLoading: false,
        });
      }
    } catch (err) {
      console.log("Error loading cached location:", err);
    }
  };

  const saveLocation = async (data: LocationState) => {
    try {
      await AsyncStorage.setItem("USER_LOCATION", JSON.stringify(data));
    } catch (err) {
      console.log("Error saving location:", err);
    }
  };

  // --------------------------------------------------
  // USER PRESSES "ALLOW LOCATION"
  // --------------------------------------------------
  const requestLocation = async () => {
    try {
      setLocation((prev) => ({ ...prev, isLoading: true }));

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        const updated = {
          latitude: null,
          longitude: null,
          hasPermission: false,
          isLoading: false,
        };
        setLocation(updated);
        await saveLocation(updated);
        return false;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const updated = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        hasPermission: true,
        isLoading: false,
      };

      setLocation(updated);
      await saveLocation(updated);

      return true;
    } catch (err: any) {
      console.log("Error requesting location:", err.message);

      const updated = {
        latitude: null,
        longitude: null,
        hasPermission: false,
        isLoading: false,
      };

      setLocation(updated);
      await saveLocation(updated);

      return false;
    }
  };

  // --------------------------------------------------
  // USER PRESSES "SKIP"
  // --------------------------------------------------
  const skipLocation = async () => {
    const updated = {
      latitude: null,
      longitude: null,
      hasPermission: false,
      isLoading: false,
    };

    setLocation(updated);
    await saveLocation(updated);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        requestLocation,
        skipLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
