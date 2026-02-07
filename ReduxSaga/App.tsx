/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// libs
import React from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Provider } from 'react-redux';

// store
import store from './src/store/store';

// components
import DeclarativeEffectsComponent from './src/features/topics/declarativeEffects/DeclarativeEffectsComponent';
import DispatchingActionsComponent from './src/features/topics/dispatchingActions/DispatchingActionsComponent';
import EffectComponent from './src/features/topics/effect/EffectComponent';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DeclarativeEffectsComponent />
        <DispatchingActionsComponent />
        <EffectComponent />
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
