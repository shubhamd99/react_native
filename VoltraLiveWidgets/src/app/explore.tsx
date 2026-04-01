import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore Voltra</Text>
        <Text style={styles.description}>
          Voltra allows you to build native iOS Live Activities and Android Widgets using React.
        </Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Live Activities</Text>
          <Text style={styles.cardText}>
            • Real-time updates on the Lock Screen.
            {'\n'}• Dynamic Island integration.
            {'\n'}• Push updates via APNs.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Home Screen Widgets</Text>
          <Text style={styles.cardText}>
            • Static and interactive widgets.
            {'\n'}• Jetpack Compose Glance support for Android.
            {'\n'}• Swift UI support for iOS.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
});
