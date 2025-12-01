import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useLocation } from '../contexts/LocationContext';

export default function LocationPermissionScreen() {
  const router = useRouter();
  const { location, requestLocation, skipLocation } = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.isGranted || location.hasPermission || location.skipped) {
      router.replace("/(tabs)");
    }
  }, [location.isGranted, location.hasPermission, location.skipped, router]);

  const handleAllowLocation = async () => {
    setLoading(true);

    await requestLocation();

    setLoading(false);

    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await skipLocation();
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <View className="items-center mb-4">
        <Text className="text-3xl font-bold text-primary mb-2">HappyBiryani</Text>
        <Text className="text-gray-500 text-center mb-4">
          The joy of good food
        </Text>
      </View>

      <View className="w-[90%] h-[50%] rounded-full items-center justify-center mb-6">
        <Image source={require('../assets/images/image.jpg')} className="w-full h-full rounded-xl" />
      </View>

      <View className="items-center mb-8">
        <View className="flex-row items-center mb-4">
          <Text className="text-3xl">📍</Text>
          <Text className="text-2xl font-bold text-gray-800">Enable Location</Text>
        </View>
      </View>

      <Button
        title="Allow Location"
        onPress={handleAllowLocation}
        loading={loading}
        className="w-[90%] mb-4"
      />

      <Button
        title="Skip for now"
        outline
        onPress={handleSkip}
        className="w-[90%]"
      />
    </View>
  );
}
