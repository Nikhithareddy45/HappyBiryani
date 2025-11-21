import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { StoreCardProps } from '../types/common';
import { calculateDistance, getFormattedDistance } from '../utils/location';

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  area_street,
  district,
  state,
  pincode,
  contact_number,
  timings,
  file_1,
  latitude,
  longitude,
  userLatitude,
  userLongitude
}) => {
  const router = useRouter();

  const distance = userLatitude && userLongitude
    ? calculateDistance(userLatitude, userLongitude, latitude, longitude)
    : null;
  const handleNavigateToLocation = async () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening maps:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`../store/${id}`)}
      className="bg-white rounded-xl shadow-sm mr-4 w-[100%]"
    >
      <Image
        source={{ uri: file_1 }}
        className="w-full h-52 rounded-t-xl"
        resizeMode="cover"
      />

      {distance && (
        <View className="absolute top-3 left-3 bg-secondary px-3 py-1 rounded-full">
          <Text className="text-white font-semibold text-sm">
            {getFormattedDistance(distance)}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleNavigateToLocation}
        className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full shadow-sm"
      >
        <Text className="text-secondary text-lg">🧭</Text>
      </TouchableOpacity>

      <View className="p-4">
        <Text
          className="text-lg font-bold text-gray-800"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>

        <View className="flex-row items-start">
          <Text className="text-base mr-1">📍</Text>
          <Text className="text-sm text-gray-600 flex-1">
            {area_street}, {district}, {state} - {pincode}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-base mr-1">📞</Text>
          <Text className="text-sm text-gray-600">{contact_number}</Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-base mr-1">🕐</Text>
          <Text className="text-sm text-gray-600">{timings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
