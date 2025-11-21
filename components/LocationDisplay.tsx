import React from 'react';
import { View, Text } from 'react-native';

interface LocationDisplayProps {
  location: string;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ location }) => {
  return (
    <View className="flex-row items-center px-4 py-3 bg-white">
      <Text className="text-2xl mr-2">📍</Text>
      <Text className="text-base font-semibold text-gray-800">{location}</Text>
    </View>
  );
};