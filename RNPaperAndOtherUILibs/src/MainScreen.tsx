import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar, TabBarItem, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaperUsage from './paper/PaperUsage';
import TamaguiUsage from './tamagui/TamaguiUsage';
import GluestackUsage from './gluestack/GluestackUsage';

type Route = { key: string; title: string };

const renderScene = SceneMap({
  paper: PaperUsage,
  tamagui: TamaguiUsage,
  gluestack: GluestackUsage,
});

const renderLabel = ({ color, route }: { color: string; route: Route }) => (
  <Text style={[styles.label, { color }]}>
    {route.title}
  </Text>
);

const renderTabBarItem = (itemProps: any) => {
  const { key, ...rest } = itemProps;
  return (
    <TabBarItem
      key={key}
      {...rest}
      label={(labelProps) => renderLabel({ ...labelProps, route: itemProps.route as Route })}
    />
  );
};

const MainScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'paper', title: 'RN Paper' },
    { key: 'tamagui', title: 'Tamagui' },
    { key: 'gluestack', title: 'Gluestack' },
  ]);

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> }
  ) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      activeColor="#6200ee"
      inactiveColor="#666"
      renderTabBarItem={renderTabBarItem as any}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabbar: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  indicator: {
    backgroundColor: '#6200ee',
    height: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default MainScreen;
