// app/index.tsx
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useLocation } from "@/contexts/LocationContext";

export default function Index() {
  const router = useRouter();
  const { location } = useLocation();

  useEffect(() => {
    if (location.isInitializing) return;

    if (location.isGranted || location.skipped) {
      router.replace("/(tabs)");
    } else {
      router.replace("/locationPermission");
    }
  }, [location.isInitializing, location.isGranted, location.skipped, router]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator />
    </View>
  );
}
