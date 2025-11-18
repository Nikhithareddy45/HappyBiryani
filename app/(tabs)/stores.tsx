import { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useLocation } from "@/contexts/LocationContext";
import { BackButton } from '@/components/ui/BackButton';

import { StoreCard } from "@/components/StoreCard";
import { StoreDetailSkeleton } from "@/components/ui/SkeletonLoader";

import { getStores } from "@/services/api";
import { Store } from "@/types/common";
import { sortStoresByDistance, shuffleArray } from "@/utils/location";

export default function StoresScreen() {
  const { location } = useLocation();

  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStores();
  }, [location.latitude, location.longitude]);

  const loadStores = async () => {
    try {
      setLoading(true);

      const storesData = await getStores();

      if (storesData?.length) {
        const finalStores =
          location.hasPermission &&
            location.latitude &&
            location.longitude
            ? sortStoresByDistance(
              storesData,
              location.latitude,
              location.longitude
            )
            : shuffleArray(storesData);

        setStores(finalStores);
      }
    } catch (e) {
      console.error("Error loading stores:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStores();
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ac1e24"]}
        />
      }
    >
      <View className="p-4 pb-20">
        <View className="items-center gap-2 flex-row">
          <BackButton />
          <Text className="text-2xl font-bold text-primary mb-2 ">All Stores</Text>
        </View>
        <Text className="text-sm text-gray-600 mb-6">
          {location.hasPermission
            ? "Showing stores nearest to farthest"
            : "Location off — showing random stores"}
        </Text>

        {loading ? (
          <>
            <StoreDetailSkeleton />
            <StoreDetailSkeleton />
            <StoreDetailSkeleton />
            <StoreDetailSkeleton />
          </>
        ) : (
          stores.map((store) => (
            <View key={store.id} className="mb-4">
              <StoreCard
                {...store}
                userLatitude={location.latitude}
                userLongitude={location.longitude}
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
