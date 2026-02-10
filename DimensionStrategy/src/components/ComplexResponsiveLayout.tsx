import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  isTabletDevice,
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utils/responsive';

const ComplexResponsiveLayout = () => {
  // Just for demo purposes to force a re-render if orientation changes (though Dimensions listener is better)
  // Here we'll just rely on the initial check for simplicity, or use a hook if we want real-time updates.
  // For this example, we'll stick to the static check but show how the layout differs.

  // Simulating data items
  const items = Array.from({ length: 8 }).map((_, i) => `Item ${i + 1}`);

  // Tablet gets 4 columns, phone gets 2
  const numColumns = isTabletDevice ? 4 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isTabletDevice
          ? 'Tablet Layout (4 Columns)'
          : 'Phone Layout (2 Columns)'}
      </Text>

      <View style={styles.grid}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[styles.card, { width: `${100 / numColumns}%` }]}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This component adapts its grid based on the device type. On a tablet,
          it shows more content horizontally.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
  },
  header: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    padding: moderateScale(5),
    aspectRatio: 1, // Keep items square
  },
  cardContent: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  infoBox: {
    marginTop: verticalScale(20),
    padding: moderateScale(15),
    backgroundColor: '#e8f4fd',
    borderRadius: moderateScale(8),
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoText: {
    color: '#0d47a1',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
});

export default ComplexResponsiveLayout;
