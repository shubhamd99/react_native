import './src/unistyles';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useUnistyles, UnistylesRuntime } from 'react-native-unistyles';
import { UnistylesComponent } from './src/components/UnistylesComponent';
import { UniwindComponent } from './src/components/UniwindComponent';
import { styles } from './App.styles';

function App(): React.JSX.Element {
  // Access the current theme (re-renders automatically on theme change)
  const { theme } = useUnistyles();
  const isDarkMode = theme.colors.background === '#000000';

  const toggleTheme = () => {
    // UnistylesRuntime allows programmatic control over themes and runtime values
    // This updates the entire app's theme natively
    UnistylesRuntime.setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
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
          <Text style={styles.title}>
            Uniwind & Unistyles
          </Text>
          
          <Pressable 
            onPress={toggleTheme}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </Text>
          </Pressable>

          <Text style={styles.description}>
            This project showcases the high-performance Uni-stack for React Native styling.
          </Text>

          <UnistylesComponent />
          
          <UniwindComponent />

          <View className="mt-8 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
            <Text className="text-lg font-bold text-yellow-800">Why Uni-stack?</Text>
            <Text className="text-yellow-700 mt-2">
              • Near-native performance (C++ Core)
            </Text>
            <Text className="text-yellow-700">
              • Built for the New Architecture (Fabric)
            </Text>
            <Text className="text-yellow-700">
              • Tailwind v4 Support (Uniwind)
            </Text>
            <Text className="text-yellow-700">
              • Supercharged StyleSheet (Unistyles)
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
