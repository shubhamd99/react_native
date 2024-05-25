import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../components/home/HomeScreen';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
