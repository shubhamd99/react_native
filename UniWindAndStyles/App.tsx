import './src/global.css';
import './src/unistyles';
import React from 'react';
import { ScrollView, StatusBar, Text, View, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useUnistyles, UnistylesRuntime } from 'react-native-unistyles';
import { Uniwind } from 'uniwind';
import { UnistylesComponent } from './src/components/UnistylesComponent';
import { UniwindComponent } from './src/components/UniwindComponent';
import { styles } from './App.styles';
import { InfoBox } from './src/components/InfoBox';

function App(): React.JSX.Element {
  // Access the current theme (re-renders automatically on theme change)
  const { theme } = useUnistyles();
  const isDarkMode = theme.colors.background === '#000000';

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';

    // In v3, we must disable adaptiveThemes before manually setting a theme
    if (UnistylesRuntime.hasAdaptiveThemes) {
      UnistylesRuntime.setAdaptiveThemes(false);
    }

    // Sync both engines
    UnistylesRuntime.setTheme(nextTheme);
    Uniwind.setTheme(nextTheme);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Uniwind & Unistyles</Text>

            <Pressable
              onPress={toggleTheme}
              style={({ pressed }) => [
                styles.toggleButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.toggleText}>
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
              </Text>
            </Pressable>

            <Text style={styles.description}>
              This project showcases the high-performance Uni-stack for React
              Native styling.
            </Text>

            <UnistylesComponent />

            <UniwindComponent />

            <InfoBox />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
