/**
 * NitroModulesDemo App
 * Showcase for high-performance Nitro Modules.
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NitroScreen } from './src/screens/NitroScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NitroScreen />
    </SafeAreaProvider>
  );
}

export default App;
