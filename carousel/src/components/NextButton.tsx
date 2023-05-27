import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

type IProps = {
  percentage: number;
  scrollTo: () => void;
};

const NextButton: React.FC<IProps> = ({percentage, scrollTo}) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<View>(null);

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: percentage,
      duration: 250,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef?.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run when component mounts

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation={'-90'} origin={center}>
          <Circle
            stroke={'#E6E7E8'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            fill={'#fff'}
            stroke="#F4338F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={scrollTo}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#f4338f',
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;
