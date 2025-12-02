import SafeArea from "@/components/ui/SafeArea";
import { LocationProvider, useLocation } from "@/contexts/LocationContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    OppoSans: require("../assets/fonts/OPPOSansRegular.ttf"),
    OppoSansBold: require("../assets/fonts/OPPOSansBold.ttf"),
    OppoSansMedium: require("../assets/fonts/OPPOSansMedium.ttf"),
    OppoSansLight: require("../assets/fonts/OPPOSansLight.ttf"),
    OppoSansHeavy: require("../assets/fonts/OPPOSansHeavy.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // This component ensures the splash stays visible until fonts are loaded
  // and our LocationContext finishes initialization (so index screen doesn't flash briefly)
  function SplashManager({ fontsLoaded }: { fontsLoaded: boolean }) {
    const { location } = useLocation();
    useEffect(() => {
      if (fontsLoaded && !location.isInitializing) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, location.isInitializing]);
    return null;
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LocationProvider>
      <SafeArea>
        <SplashManager fontsLoaded={fontsLoaded} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="reportIssue"
            options={{
              presentation: 'modal',
              title: 'Report Issue',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="store/[id]"
            options={{
              presentation: 'modal',
              title: 'Store Details',
              headerShown: false,
            }}
          />
        </Stack>
      </SafeArea>
    </LocationProvider>
  )
}