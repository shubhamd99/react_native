import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';

const ResponsiveBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responsive Box Dimensions</Text>

      <View style={styles.boxContainer}>
        <View style={styles.boxFixed}>
          <Text style={styles.text}>Fixed 100x100</Text>
        </View>
        <Text style={styles.description}>Fixed dimensions don't scale.</Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.boxResponsive}>
          <Text style={styles.text}>Scaled 100x100</Text>
        </View>
        <Text style={styles.description}>
          Scaled using horizontalScale & verticalScale.
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.boxModerate}>
          <Text style={styles.text}>Moderate 100x100</Text>
        </View>
        <Text style={styles.description}>
          Scaled using moderateScale (good for padding).
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.boxHairline}>
          <Text style={styles.textBlack}>Hairline Border</Text>
        </View>
        <Text style={styles.description}>
          Standard StyleSheet.hairlineWidth (1 physical pixel).
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.boxAspect}>
          <Text style={styles.text}>Aspect Ratio 16:9</Text>
        </View>
        <Text style={styles.description}>
          Width: 150, AspectRatio: 16/9 (Height auto).
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  boxContainer: {
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  boxFixed: {
    width: 100,
    height: 100,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxResponsive: {
    width: horizontalScale(100),
    height: verticalScale(100),
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxModerate: {
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: '#FFE66D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHairline: {
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  boxAspect: {
    width: moderateScale(150),
    aspectRatio: 16 / 9,
    backgroundColor: '#FF9F1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textBlack: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: verticalScale(5),
    fontSize: 12,
    color: '#666',
  },
});

export default ResponsiveBox;
