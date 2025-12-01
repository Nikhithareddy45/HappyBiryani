import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useLocation } from "../contexts/LocationContext";

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

  if (location.isInitializing) return null;

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
