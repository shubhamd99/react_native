import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { MMKVDemo } from './src/screens/MMKVDemo';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MMKVDemo />
    </View>
  );
}

export default App;
