/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from './src/screens/Input';

function App(): JSX.Element {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Input label="Enter Here" value={value} onChange={setValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
});

export default App;
