import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LIbraryScreen';
import PodcastDetailsScreen from '../components/podcastDetails/PodcastDetailsScreen';
import {theme} from '../constants/theme';
import MiniPlayer from '../components/miniPlayer/MiniPlayer';

const ListenNowStack = createNativeStackNavigator();

const ICON_SIZE = 24;

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
          headerShown: false,
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="PodcastDetails"
        component={PodcastDetailsScreen}
        options={{headerTitle: ''}}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createNativeStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.color.blueLight,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={tabsProps => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}>
      <MainTab.Screen
        name="ListenNow"
        options={{
          title: 'Listen Now',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <FeatherIcon
              color={props.color}
              size={ICON_SIZE}
              name="headphones"
            />
          ),
        }}
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="inbox" />
          ),
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="search" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
