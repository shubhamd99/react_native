import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { router, Link } from 'expo-router';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import { indexStyles as styles } from '@/styles/index.styles';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useSecureStore } from '@/hooks/useSecureStore';
import { useAppStore } from '@/store/useAppStore';

export default function Index() {
  const { value: storedValue, saveValue } = useSecureStore('my-secure-key');
  const { visitCount, incrementVisits, username } = useAppStore();

  useEffect(() => {
    incrementVisits();
  }, []);

  const handleSaveAndVibrate = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newValue = `Saved at ${new Date().toLocaleTimeString()}`;
    await saveValue(newValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder="L6Pj0^i_.AyE_3t7t7R**0o#DgR4"
        contentFit="cover"
        transition={1000}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Hello, {username}!</Text>
        <Text style={styles.subtitle}>
          App Version: {Constants.expoConfig?.version || 'Unknown'} | Visits: {visitCount}
        </Text>

        <PrimaryButton 
          title="Test Haptics & SecureStore" 
          icon="save-outline" 
          onPress={handleSaveAndVibrate} 
        />

        {storedValue && (
          <Text style={styles.storedText}>Securely stored: {storedValue}</Text>
        )}

        <PrimaryButton 
          title="Go to Details" 
          icon="arrow-forward-circle-outline" 
          secondary
          onPress={() => router.push({
            pathname: '/details',
            params: { user: username, visits: visitCount }
          })}
        />

        <PrimaryButton 
          title="Open Camera API" 
          icon="camera-outline" 
          onPress={() => router.push('/camera')}
        />

        <PrimaryButton 
          title="Settings & Notifications" 
          icon="settings-outline" 
          secondary
          onPress={() => router.push('/settings')}
        />

        <PrimaryButton 
          title="Storage & SQLite DB" 
          icon="server-outline" 
          onPress={() => router.push('/database')}
        />
      </View>
    </ScrollView>
  );
}
