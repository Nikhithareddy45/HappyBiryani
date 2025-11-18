import { BannerCarousel } from '@/components/BannerCarousel';
import { BackButton } from '@/components/ui/BackButton';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { useLocation } from '../../contexts/LocationContext';
import { getStoreById } from '../../services/api';
import { Banner, Store } from '../../types/common';
import { calculateDistance, getFormattedDistance } from '../../utils/location';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams();
  const { location } = useLocation();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    loadStoreDetail();
  }, [id]);

  const loadStoreDetail = async () => {
    try {
      const storeData = await getStoreById(Number(id));
      setStore(storeData);

      if (location.latitude && location.longitude && storeData) {
        const dist = calculateDistance(
          location.latitude,
          location.longitude,
          storeData.latitude,
          storeData.longitude
        );
        setDistance(dist);
      }
    } catch (error) {
      console.error('Error loading store detail:', error);
      Alert.alert('Error', 'Failed to load store details');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (number: string) => Linking.openURL(`tel:${number}`);
  const handleEmail = (email: string) => Linking.openURL(`mailto:${email}`);

  const handleDirections = () => {
    if (store) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <ScrollView className="flex-1 bg-background">
        <SkeletonLoader width="100%" height={256} />
      </ScrollView>
    );
  }

  if (!store) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-lg text-gray-600">Store not found</Text>
      </View>
    );
  }

const getMediaType = (file?: string | null): "image" | "video" => {
  if (!file) return "image";
  return file.match(/\.(mp4|mov|avi|webm)$/i) ? "video" : "image";
};

const banners: Banner[] = [
  store.file_1 ? { file: store.file_1, media_type: getMediaType(store.file_1) } : null,
  store.file_2 ? { file: store.file_2, media_type: getMediaType(store.file_2) } : null,
  store.file_3 ? { file: store.file_3, media_type: getMediaType(store.file_3) } : null,
  store.file_4 ? { file: store.file_4, media_type: getMediaType(store.file_4) } : null,
].filter((b): b is Banner => b !== null);


  return (
    <ScrollView className="flex-1 bg-background ">
      <View className="ml-2 mt-2 py-6">
        <BackButton />
      </View>

      <View className="w-full mx-auto h-[250px] rounded-full items-center justify-center mb-2">
        <BannerCarousel banners={banners}/>
      </View>

      {distance && (
        <View className=" w-[30%] bg-secondary px-2 py-1 rounded-full ml-6">
          <Text className="text-white font-bold text-base text-center">
            {getFormattedDistance(distance)}
          </Text>
        </View>
      )}

      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">{store.name}</Text>
        <Text className="text-base text-gray-600">{store.description}</Text>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <Text className="text-xl font-bold text-primary mb-2">Location</Text>

          <View className="flex-row items-start">
            <Text className="text-xl mr-3">📍</Text>
            <Text className="text-base text-gray-700 flex-1">
              {store.area_street}, {store.district}, {store.state} - {store.pincode}
            </Text>
          </View>

          <Button title="Get Directions" onPress={handleDirections} className="mt-4" />
        </View>

        {/* Contact Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <Text className="text-xl font-bold text-primary mb-2">Contact</Text>

          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center flex-1">
              <Text className="text-xl mr-3">📞</Text>
              <Text className="text-base text-gray-700">{store.contact_number}</Text>
            </View>
            <Button title="Call" onPress={() => handleCall(store.contact_number)} outline />
          </View>

          {store.alternative_contact_number && (
            <View className="flex-row items-center justify-between mb-1">
              <View className="flex-row items-center flex-1">
                <Text className="text-xl mr-3">📱</Text>
                <Text className="text-base text-gray-700">{store.alternative_contact_number}</Text>
              </View>
              <Button
                title="Call"
                onPress={() => handleCall(store.alternative_contact_number!)}
                outline
              />
            </View>
          )}

          <TouchableOpacity className="flex-row items-center mb-1" onPress={() => handleEmail(store.contact_email)}>
            <Text className="text-xl mr-3">📧</Text>
            <Text className="text-base text-primary underline">{store.contact_email}</Text>
          </TouchableOpacity>
        </View>

        {/* Hours */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <Text className="text-xl font-bold text-primary mb-2">Hours</Text>
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">🕐</Text>
            <Text className="text-base text-gray-700">{store.timings}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
