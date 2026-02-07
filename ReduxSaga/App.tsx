/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// libs
import React from 'react';
import { StatusBar, useColorScheme, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

// store
import store from './src/store/store';

// components
import DeclarativeEffectsComponent from './src/features/topics/declarativeEffects/DeclarativeEffectsComponent';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DeclarativeEffectsComponent />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
