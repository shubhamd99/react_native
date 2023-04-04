import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeTodoScreen, NewTodoScreen, UpdateTodoScreen} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

const AppContainer = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'HomeTodo'}
          component={HomeTodoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'NewTodo'}
          component={NewTodoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'UpdateTodo'}
          component={UpdateTodoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
