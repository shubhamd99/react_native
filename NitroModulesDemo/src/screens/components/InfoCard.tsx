import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../NitroScreen.styles';

interface InfoCardProps {
  nativeValue: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ nativeValue }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Native Source Info</Text>
    <Text style={styles.cardText}>
      Native Value: <Text style={styles.highlight}>{nativeValue}</Text>
    </Text>
  </View>
);
