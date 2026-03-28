import { StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Environment Detection
const isExpoGo = Constants.executionEnvironment === 'storeClient';

let storageInstance: any = null;

// Lazy-load MMKV only if NOT in Expo Go
const getMMKVStorage = () => {
  if (!isExpoGo) {
    try {
      const { createMMKV } = require('react-native-mmkv');
      if (!storageInstance) {
        storageInstance = createMMKV();
      }
      return storageInstance;
    } catch (e) {
      console.warn('MMKV failed to initialize:', e);
      return null;
    }
  }
  return null;
};

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    const mmkv = getMMKVStorage();
    if (mmkv) {
      mmkv.set(name, value);
    } else {
      await AsyncStorage.setItem(name, value);
    }
  },
  getItem: async (name) => {
    const mmkv = getMMKVStorage();
    if (mmkv) {
      const value = mmkv.getString(name);
      return value ?? null;
    } else {
      return await AsyncStorage.getItem(name);
    }
  },
  removeItem: async (name) => {
    const mmkv = getMMKVStorage();
    if (mmkv) {
      mmkv.remove(name);
    } else {
      await AsyncStorage.removeItem(name);
    }
  },
};

// Export the raw instance for direct use (careful: will be null in Expo Go)
export const getRawMMKV = () => getMMKVStorage();
