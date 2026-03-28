import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the root view background color early
SystemUI.setBackgroundColorAsync('#fff');

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ title: 'Expo Showcase' }} 
        />
        <Stack.Screen 
          name="details" 
          options={{ title: 'Detailed API View' }} 
        />
        <Stack.Screen 
          name="camera" 
          options={{ title: 'Native Camera', headerShown: false }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ title: 'Settings' }} 
        />
        <Stack.Screen 
          name="database" 
          options={{ title: 'Storage & DB' }} 
        />
      </Stack>
    </>
  );
}
