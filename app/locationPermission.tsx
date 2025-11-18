import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { requestLocationPermission } from '../utils/location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationPermissionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    const result = await requestLocationPermission();
    
    if (result.granted && result.location) {
      await AsyncStorage.setItem('hasLocationPermission', 'true');
      await AsyncStorage.setItem('userLocation', JSON.stringify(result.location));
    }
    
    setLoading(false);
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasLocationPermission', 'false');
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <View className="w-32 h-32 bg-primary rounded-full items-center justify-center mb-6">
        <Text className="text-6xl">🏪</Text>
      </View>

      <Text className="text-3xl font-bold text-primary mb-2">HappyBiryani</Text>
      <Text className="text-gray-500 text-center mb-12">
        Delicious biryani delivered to you
      </Text>

      <View className="items-center mb-8">
        <Text className="text-5xl mb-4">📍</Text>
        <Text className="text-2xl font-bold text-gray-800 mb-3">Enable Location</Text>
        <Text className="text-center text-gray-600 leading-6">
          Allow location access to find the nearest HappyBiryani stores and get personalized recommendations.
        </Text>
      </View>

      <Button
        title="Allow Location"
        onPress={handleAllowLocation}
        loading={loading}
        className="w-full mb-4"
      />

      <Button
        title="Skip for now"
        outline
        onPress={handleSkip}
        className="w-full"
      />
    </View>
  );
}