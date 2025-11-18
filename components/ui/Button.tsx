import { ButtonProps } from '@/types/common';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export const Button: React.FC<ButtonProps> = ({
  title,
  outline = false,
  onPress,
  className = '',
  icon,
  loading = false,
  children
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`py-3 px-6 rounded-lg flex-row items-center justify-center ${
        outline ? 'border-2 border-primary bg-white' : 'bg-primary'
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={outline ? '#ac1e24' : 'white'} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-semibold text-base text-center ${outline ? 'text-primary' : 'text-white'}`}>
            {children || title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};