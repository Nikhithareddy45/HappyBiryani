// utils/stores.ts
import { Store } from "../types/common";
import { sortStoresByDistance, shuffleArray } from "./location";

export const getNearestStores = (
  stores: Store[],
  userLat: number | null,
  userLon: number | null,
): Store[] => {
  if (userLat != null && userLon != null) {
    const sorted = sortStoresByDistance(stores, userLat, userLon);
    return sorted
  }
  return shuffleArray(stores)
};

export const getRandomStores = (
  stores: Store[],
): Store[] => {
  return shuffleArray(stores)
};