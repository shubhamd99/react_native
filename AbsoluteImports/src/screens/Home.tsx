import HelloComponent from '@components/HelloComponent';
import constants from '@constants/constants';
import React from 'react';
import {Text, View} from 'react-native';

const Hello = () => {
  return (
    <View style={{backgroundColor: 'green'}}>
      <Text>{constants.HOME_SCREEN}</Text>
      <HelloComponent />
    </View>
  );
};

export default Hello;
