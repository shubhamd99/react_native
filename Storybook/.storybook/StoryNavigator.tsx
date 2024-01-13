import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const StorybookStack = createStackNavigator();

export const NavigationDecorator = (story: any) => {
  const Screen = () => story();
  return (
    <NavigationContainer independent={true}>
      <StorybookStack.Navigator>
        <StorybookStack.Screen
          name="MyStorybookScreen"
          component={Screen}
          options={{header: () => null}}
        />
      </StorybookStack.Navigator>
    </NavigationContainer>
  );
};
