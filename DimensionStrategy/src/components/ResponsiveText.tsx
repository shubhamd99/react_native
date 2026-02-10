import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalize, verticalScale } from '../utils/responsive';

const ResponsiveText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responsive Text Sizes</Text>

      <View style={styles.row}>
        <Text style={styles.fixed16}>Fixed 16px</Text>
        <Text style={styles.normalized16}>Normalized 16px</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.fixed24}>Fixed 24px</Text>
        <Text style={styles.normalized24}>Normalized 24px</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.fixed32}>Fixed 32px</Text>
        <Text style={styles.normalized32}>Normalized 32px</Text>
      </View>

      <Text style={styles.note}>
        * Normalized text scales based on screen width and pixel density.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    padding: verticalScale(15),
    borderRadius: 10,
  },
  title: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: verticalScale(5),
  },
  note: {
    marginTop: verticalScale(10),
    fontSize: normalize(12),
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
  fixed16: {
    fontSize: 16,
  },
  normalized16: {
    fontSize: normalize(16),
  },
  fixed24: {
    fontSize: 24,
  },
  normalized24: {
    fontSize: normalize(24),
  },
  fixed32: {
    fontSize: 32,
  },
  normalized32: {
    fontSize: normalize(32),
  },
});

export default ResponsiveText;
