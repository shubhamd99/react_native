import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { detailsStyles as styles } from '@/styles/details.styles';

export default function Details() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.text}>
        This screen demonstrates Expo Router's automatic stack navigation. 
        Notice how the back button is automatically handled.
      </Text>
      <Text style={styles.subtext}>
        Passed params: {JSON.stringify(params)}
      </Text>
    </View>
  );
}
