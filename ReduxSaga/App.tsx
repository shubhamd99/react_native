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
  View,
} from 'react-native';
import { Provider } from 'react-redux';

// store
import store from './src/store/store';

// components
import DeclarativeEffectsComponent from './src/features/topics/declarativeEffects/DeclarativeEffectsComponent';
import DispatchingActionsComponent from './src/features/topics/dispatchingActions/DispatchingActionsComponent';
import EffectComponent from './src/features/topics/effect/EffectComponent';
import ErrorHandlingComponent from './src/features/topics/errorHandling/ErrorHandlingComponent';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <DeclarativeEffectsComponent />
          <DispatchingActionsComponent />
          <EffectComponent />
          <ErrorHandlingComponent />
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default App;
