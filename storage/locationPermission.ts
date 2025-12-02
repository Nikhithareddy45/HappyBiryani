// storage/locationPermission.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'locationGranted';

export async function setLocationGranted(value: boolean) {
  await AsyncStorage.setItem(KEY, value ? 'true' : 'false'); // [web:10]
}

export async function getLocationGranted(): Promise<boolean> {
  const v = await AsyncStorage.getItem(KEY);                 // [web:10]
  return v === 'true';
}
