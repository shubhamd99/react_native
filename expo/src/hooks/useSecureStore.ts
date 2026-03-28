import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useSecureStore = (key: string) => {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(key);
        setValue(storedValue);
      } catch (e) {
        console.error('Failed to load secure store value', e);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  const saveValue = async (newValue: string) => {
    try {
      await SecureStore.setItemAsync(key, newValue);
      setValue(newValue);
    } catch (e) {
      console.error('Failed to save secure store value', e);
    }
  };

  return { value, saveValue, loading };
};
