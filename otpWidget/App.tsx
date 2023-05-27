/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
