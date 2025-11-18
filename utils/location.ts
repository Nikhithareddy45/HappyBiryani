import * as Location from 'expo-location';
import { Store } from '../types/common';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return { granted: false, location: null };
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      granted: true,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    };
  } catch (error) {
    console.error('Error requesting location:', error);
    return { granted: false, location: null };
  }
};

// Haversine formula to calculate distance between two coordinates
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const sortStoresByDistance = (
  stores: Store[],
  userLat: number,
  userLon: number
): Store[] => {
  return [...stores].sort((a, b) => {
    const distA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
    const distB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
    return distA - distB;
  });
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getFormattedDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)} m`;
  }
  return `${distance.toFixed(1)} km`;
};