import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface TextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
  lines?: number;
  className?: string;
  containerClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  lines = 5,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-base font-semibold text-gray-800 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-base ${className}`}
        placeholderTextColor="#9CA3AF"
        multiline
        numberOfLines={lines}
        textAlignVertical="top"
        style={{ minHeight: lines * 24 }}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
