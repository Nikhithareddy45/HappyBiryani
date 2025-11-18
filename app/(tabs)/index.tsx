import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

import { BannerCarousel } from "@/components/BannerCarousel";
import { StoreCard } from "@/components/StoreCard";
import { useLocation } from "@/contexts/LocationContext";

import { CarouselSkeleton, HeadingSkeleton, StoreCardSkeleton } from "@/components/ui/SkeletonLoader";
import { getBanners, getStores } from "@/services/api";
import { Banner, Store } from "@/types/common";
import { shuffleArray, sortStoresByDistance } from "@/utils/location";

export default function HomeScreen() {
  const router = useRouter();
  const { location } = useLocation();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [nearestStores, setNearestStores] = useState<Store[]>([]);
  const [popularStores, setPopularStores] = useState<Store[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [address, setAddress] = useState("");

  // ------------------------
  // GET USER ADDRESS
  // ------------------------
  useEffect(() => {
    if (location.latitude && location.longitude) {
      getAddressFromCoords();
    }
    loadData(false);
  }, [location.latitude, location.longitude]);

  const getAddressFromCoords = async () => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (result.length > 0) {
        const a = result[0];
        const fullAddress = `${a.street || ""} ${a.name || ""}, ${a.district || a.subregion || ""}, ${
          a.city || a.region || ""
        }`;
        setAddress(fullAddress);
      }
    } catch (err) {
      console.log("Reverse Geocode Error:", err);
    }
  };

  // ------------------------
  // LOAD DATA
  // ------------------------
  const loadData = async (isRefresh: boolean) => {
    try {
      if (!isRefresh) setLoading(true);

      const [bannersData, storesData] = await Promise.all([getBanners(), getStores()]);

      if (bannersData) setBanners(bannersData);

      if (storesData?.length > 0) {
        if (location.hasPermission && location.latitude && location.longitude) {
          const sorted = sortStoresByDistance(storesData, location.latitude, location.longitude);

          setNearestStores(sorted.slice(0, 4));
          setPopularStores(shuffleArray(storesData).slice(0, 4));
        } else {
          const shuffled = shuffleArray(storesData);
          setNearestStores(shuffled.slice(0, 4));
          setPopularStores(shuffleArray(storesData).slice(0, 4));
        }
      }
    } catch (err) {
      console.error("Error loading home data:", err);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  // ------------------------
  // LOADING SKELETONS
  // ------------------------
  if (loading) {
    return (
      <ScrollView
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <CarouselSkeleton />

        <View className="px-4 mt-6">
          <HeadingSkeleton />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((i) => (
              <View key={i} className="mr-4 w-80">
                <StoreCardSkeleton />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="px-4 mt-8">
          <HeadingSkeleton />
          {[1, 2, 3].map((i) => (
            <View key={i} className="mb-4">
              <StoreCardSkeleton />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  // ------------------------
  // MAIN UI
  // ------------------------
  return (
     <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#ac1e24"]} />
      }
    >
     <View className="items-start gap-1 ml-4 mt-3">
        <View className="flex-row items-center ml-2">
          <Text className="text-2xl">📍</Text>
          <Text className="text-xl font-bold text-primary ml-2">
            {location.hasPermission ? "Your Location" : "No Location"}
          </Text>
        </View>

        {location.hasPermission && (
          <Text
            className="text-sm text-gray-600 w-[92%]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {address || "Fetching address..."}
          </Text>
        )}
      </View>
      {/* Banners */}
      <View className="mt-3">
        {banners.length > 0 && <BannerCarousel banners={banners} />}
      </View>

      {/* Nearest Stores */}
      <View className="px-4 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-primary">
            {location.hasPermission ? "Nearest Stores" : "Featured Stores"}
          </Text>

          <TouchableOpacity onPress={() => router.push("/(tabs)/stores")}>
            <Text className="text-secondary font-semibold">View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {nearestStores.map((store) => (
            <View key={store.id} style={{ width: 350, marginRight: 16 }}>
              <StoreCard
                {...store}
                userLatitude={location.latitude}
                userLongitude={location.longitude}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Popular Stores */}
      <View className="px-4 mt-8 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-primary">Popular Stores</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/stores")}>
            <Text className="text-secondary font-semibold">View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularStores.map((store) => (
            <View key={store.id} style={{ width: 350, marginRight: 16 }}>
              {/* // <View key={store.id} className="mr-4 w-80 flex-shrink-0"> */}
              <StoreCard
                {...store}
                userLatitude={location.latitude}
                userLongitude={location.longitude}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
