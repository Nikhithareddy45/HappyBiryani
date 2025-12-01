import React, { 
  PropsWithChildren, 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  hasPermission: boolean; // true if we currently have a usable location in-memory
  isGranted: boolean; // stored user preference — 'asked and granted'
  skipped: boolean; // user explicitly skipped location
  isInitializing: boolean; // true while reading AsyncStorage
};

const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    hasPermission: false,
    isGranted: false,
    skipped: false,
    isInitializing: true,
  });

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      const [storedIsGranted, storedSkipped, storedUserLocation] = await Promise.all([
        AsyncStorage.getItem("isGranted"),
        AsyncStorage.getItem("skippedLocation"),
        AsyncStorage.getItem("USER_LOCATION"),
      ]);

      const storedIsGrantedBool = storedIsGranted === "true";
      const storedSkippedBool = storedSkipped === "true";

      // set initial state from cache without triggering prompts
      setLocation((prev) => ({
        ...prev,
        latitude: storedUserLocation ? JSON.parse(storedUserLocation).latitude : prev.latitude,
        longitude: storedUserLocation ? JSON.parse(storedUserLocation).longitude : prev.longitude,
        isGranted: storedIsGrantedBool,
        skipped: storedSkippedBool,
        hasPermission: storedIsGrantedBool && !!storedUserLocation,
      }));

      // if stored 'granted', attempt to refresh the current location silently (no prompt)
      if (storedIsGrantedBool) {
        try {
          const { status } = await Location.getForegroundPermissionsAsync();
          if (status === "granted") {
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const updated = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              hasPermission: true,
              isGranted: true,
              skipped: false,
              isInitializing: false,
            } as LocationState;
            setLocation(updated);
            await AsyncStorage.setItem("USER_LOCATION", JSON.stringify({ latitude: updated.latitude, longitude: updated.longitude }));
          } else {
            // OS permission no longer granted - clear stored isGranted and stored location
            await AsyncStorage.removeItem("isGranted");
            await AsyncStorage.removeItem("USER_LOCATION");
            setLocation((prev) => ({ ...prev, latitude: null, longitude: null, hasPermission: false, isGranted: false, isInitializing: false }));
          }
        } catch (err) {
          console.log("Error refreshing location from cache:", err);
          // don't fail initialization; we'll keep cached state where possible
        }
      }
    } catch (err) {
      console.log("Error initializing location from storage:", err);
    } finally {
      // always mark initialization finished
      setLocation((prev) => ({ ...prev, isInitializing: false }));
    }
  };

  const requestLocation = async () => {
    try {
      // Check OS-level permission without showing the prompt
      const currentPerm = await Location.getForegroundPermissionsAsync();

      // If the OS already grants, just grab location silently
      if (currentPerm.status === "granted") {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const updated = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          hasPermission: true,
          isGranted: true,
          skipped: false,
          isInitializing: false,
        } as LocationState;
        setLocation(updated);
        await AsyncStorage.setItem("isGranted", "true");
        await AsyncStorage.setItem("USER_LOCATION", JSON.stringify({ latitude: updated.latitude, longitude: updated.longitude }));
        return true;
      }

      // If we don't have OS permission, request it which may show a prompt
      const request = await Location.requestForegroundPermissionsAsync();
      if (request.status !== "granted") {
        // user denied: ensure we clear cached values
        await AsyncStorage.removeItem("isGranted");
        await AsyncStorage.removeItem("USER_LOCATION");
        setLocation((prev) => ({ ...prev, latitude: null, longitude: null, hasPermission: false, isGranted: false }));
        return false;
      }

      // permission granted via request, fetch location
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const updated = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        hasPermission: true,
        isGranted: true,
        skipped: false,
        isInitializing: false,
      } as LocationState;
      setLocation(updated);
      await AsyncStorage.setItem("isGranted", "true");
      await AsyncStorage.setItem("USER_LOCATION", JSON.stringify({ latitude: updated.latitude, longitude: updated.longitude }));
      return true;

    } catch (error) {
      console.log("Location Fetch Error:", error);
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
    <LocationContext.Provider value={{ location, requestLocation, skipLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
