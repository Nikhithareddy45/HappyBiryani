import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

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
  // USER PRESSES "ALLOW LOCATION"
  // --------------------------------------------------
  const requestLocation = async () => {
    try {
      setLocation((prev) => ({ ...prev, isLoading: true }));

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // User denied permission
        setLocation((prev) => ({
          ...prev,
          hasPermission: false,
          isLoading: false,
        }));
        return false;
      }

      // Try to get location
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        hasPermission: true,
        isLoading: false,
      });

      return true;
    } catch (err: any) {
      console.log("Error requesting location:", err.message);

      // Some devices throw "unsatisfied device settings" (GPS OFF)
      setLocation((prev) => ({
        ...prev,
        hasPermission: false,
        isLoading: false,
      }));

      return false;
    }
  };

  // --------------------------------------------------
  // USER PRESSES "SKIP" → NO PERMISSION
  // --------------------------------------------------
  const skipLocation = async () => {
    setLocation({
      latitude: null,
      longitude: null,
      hasPermission: false,
      isLoading: false,
    });
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
