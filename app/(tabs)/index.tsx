// app/(tabs)/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";

import { BannerCarousel } from "@/components/BannerCarousel";
import { StoreCard } from "@/components/StoreCard";
import { useLocation } from "@/contexts/LocationContext";

import {
  CarouselSkeleton,
  HeadingSkeleton,
  StoreCardSkeleton,
} from "@/components/ui/SkeletonLoader";
import { getBanners, getStores } from "@/services/api";
import { Banner, Store } from "@/types/common";
import { getNearestStores, getRandomStores } from "@/utils/stores";
import { getCoordinates, getAddressFromCoords } from "@/utils/location";

export default function HomeScreen() {
  const router = useRouter();
  const { location } = useLocation();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [nearestStores, setNearestStores] = useState<Store[]>([]);
  const [popularStores, setPopularStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [address, setAddress] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.85;

  useEffect(() => {
    const init = async () => {
      try {
        let lat: number | null = location.latitude;
        let lon: number | null = location.longitude;

        if (location.isGranted) {
          const coords = await getCoordinates();
          lat = coords.latitude;
          lon = coords.longitude;

          if (lat != null && lon != null) {
            const addr = await getAddressFromCoords(lat, lon);
            setAddress(addr);
          }
        }

        await loadData(false, lat, lon);
      } catch (e) {
        console.log("Home init error:", e);
        await loadData(false, null, null);
      }
    };
    init();
  }, [location.isGranted]);



  const loadData = async (
    isRefresh: boolean,
    lat: number | null,
    lon: number | null
  ) => {
    try {
      if (!isRefresh) setLoading(true);

      const [bannersData, storesData] = await Promise.all([
        getBanners(),
        getStores(),
      ]);

      if (bannersData) setBanners(bannersData);

      if (storesData?.length) {
        const nearestAll = getNearestStores(storesData, lat, lon);
        const randomAll = getRandomStores(storesData);

        setNearestStores(nearestAll);
        setPopularStores(randomAll);
      }
    } catch (err) {
      console.error("Error loading home data:", err);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    let lat = location.latitude;
    let lon = location.longitude;

    if (location.isGranted) {
      const coords = await getCoordinates();
      lat = coords.latitude;
      lon = coords.longitude;
      if (lat != null && lon != null) {
        await getAddressFromCoords(lat, lon);
      }
    }

    await loadData(true, lat, lon);
  };

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

  return (
    <ScrollView
      className="flex-1 bg-background w-[100%] h-[100%]"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ac1e24"]}
        />
      }
    >
      <View className="items-start gap-1 ml-4 mt-3">
        <View className="flex-row items-center ml-2">
          <Text className="text-2xl">📍</Text>
          <Text className="text-xl font-bold text-primary ml-2">
            {location.isGranted ? "Your Location" : "No Location"}
          </Text>
        </View>

        {location.isGranted && (
          <Text
            className="text-sm text-gray-600 w-[92%]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {address || "Fetching address..."}
          </Text>
        )}
      </View>

      <View className="mt-3">
        {banners.length > 0 && <BannerCarousel banners={banners} />}
      </View>

      <View className="px-4 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-primary">
            {location.isGranted ? "Nearest Stores" : "Featured Stores"}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/stores")}>
            <Text className="text-secondary font-semibold">View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nearestStores.slice(0, 4).map((store) => (
            <View key={store.id} style={{ width: cardWidth, marginRight: 16 }}>
              <StoreCard
                {...store}
                userLatitude={location.latitude}
                userLongitude={location.longitude}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="px-4 mt-8 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-primary">Popular Stores</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/stores")}>
            <Text className="text-secondary font-semibold">View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularStores.slice(0, 4).map((store) => (
            <View key={store.id} style={{ width: cardWidth, marginRight: 16 }}>
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
