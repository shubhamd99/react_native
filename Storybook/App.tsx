/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import OtpScreen from './src/screens/OtpScreen';
import Config from 'react-native-config';

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
      <OtpScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
});

let AppEntryPoint = null;

if (Config.STORYBOOK_ENABLED === 'true') {
  AppEntryPoint = require('./.storybook').default;
} else {
  AppEntryPoint = App;
}

export default AppEntryPoint;
