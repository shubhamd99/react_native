import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieScreen from './components/LottieScreen';
import RiveScreen from './components/RiveScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'lottie' | 'rive' | null>(
    null,
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'lottie':
        return <LottieScreen />;
      case 'rive':
        return <RiveScreen />;
      default:
        return (
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Lottie vs Rive</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Lottie Examples"
                onPress={() => setCurrentScreen('lottie')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Rive Examples"
                onPress={() => setCurrentScreen('rive')}
              />
            </View>
            <Text style={styles.footer}>
              Select an animation implementation to explore
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {currentScreen && (
          <View style={styles.backButton}>
            <Button
              title="< Back to Menu"
              onPress={() => setCurrentScreen(null)}
            />
          </View>
        )}
        {renderScreen()}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 200,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
  },
});

export default App;
