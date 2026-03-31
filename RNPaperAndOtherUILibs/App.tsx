import React from 'react';
import "./global.css";
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import MainScreen from './src/MainScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Custom theme for Paper to match the look
const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={isDarkMode ? 'dark' : 'light'}
        >
          <PaperProvider theme={paperTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor="white"
            />
            <MainScreen />
          </PaperProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
