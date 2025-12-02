import * as ExpoLocation from "expo-location";
import { Store } from "../types/common";
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const sortStoresByDistance = (
  stores: Store[],
  userLat: number,
  userLon: number
): Store[] =>
  [...stores].sort((a, b) => {
    const distA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
    const distB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
    return distA - distB;
  });

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getFormattedDistance = (distance: number): string =>
  distance < 1
    ? `${(distance * 1000).toFixed(0)} m`
    : `${distance.toFixed(1)} km`;
    
export const getCoordinates = async (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  try {
    const perm = await ExpoLocation.getForegroundPermissionsAsync(); // [web:3]
    if (perm.status !== "granted") {
      return { latitude: null, longitude: null };
    }

    const loc = await ExpoLocation.getCurrentPositionAsync({
      accuracy: ExpoLocation.Accuracy.Highest,
    }); // [web:3][web:11]

    return {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
  } catch (e) {
    console.log("getCoordinates error:", e);
    return { latitude: null, longitude: null };
  }
};

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const result = await ExpoLocation.reverseGeocodeAsync({
      latitude,
      longitude,
    }); // [web:3]

    if (!result.length) return "";

    const a = result[0];
    const fullAddress = `${a.street || ""} ${a.name || ""}, ${
      a.district || a.subregion || ""
    }, ${a.city || a.region || ""}`;
    return fullAddress.trim();
  } catch (err) {
    console.log("Reverse Geocode Error:", err);
    return "";
  }
};
