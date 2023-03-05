import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../../components/Page';
import styles from './styles';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const HomeScreen = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}>
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            index={index}
            title={title}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default HomeScreen;
