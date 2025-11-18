import SafeArea from "@/components/ui/SafeArea";
import { LocationProvider } from "@/contexts/LocationContext";
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

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LocationProvider>
      <SafeArea>
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