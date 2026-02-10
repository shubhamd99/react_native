import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ResponsiveBox from './src/components/ResponsiveBox';
import ResponsiveText from './src/components/ResponsiveText';
import ComplexResponsiveLayout from './src/components/ComplexResponsiveLayout';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              isDarkMode ? styles.whiteText : styles.blackText,
            ]}
          >
            Dimension Strategy Demo
          </Text>
        </View>

        <View
          style={isDarkMode ? styles.blackBackground : styles.whiteBackground}
        >
          <ResponsiveBox />
          <ResponsiveText />
          <ComplexResponsiveLayout />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  blackBackground: {
    backgroundColor: 'black',
  },
});

export default App;
