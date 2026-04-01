import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { OrderTrackingActivity } from '../live-activities/OrderTrackingActivity';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isActivityActive, setIsActivityActive] = useState(false);

  const toggleActivity = () => {
    setIsActivityActive(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Options title="Voltra Demo" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Voltra Live Widgets</Text>
          <Text style={styles.subtitle}>
            Build native Live Activities and Home Screen Widgets in React.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Activity Demo</Text>
            <View style={[styles.statusDot, isActivityActive ? styles.dotActive : styles.dotInactive]} />
          </View>
          
          <Text style={styles.description}>
            Interactive Lock Screen and Dynamic Island tracking for iOS. On Android, this can manifest as a persistent notification or widget update.
          </Text>

          <TouchableOpacity 
            style={[styles.button, isActivityActive ? styles.buttonActive : styles.buttonInactive]} 
            onPress={toggleActivity}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isActivityActive ? 'Stop Live Activity' : 'Start Order Tracking'}
            </Text>
          </TouchableOpacity>
          
          {isActivityActive && (
            <OrderTrackingActivity 
              orderId="8821" 
              status="On the way" 
              eta="12 mins" 
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Home Screen Widgets</Text>
          <Text style={styles.description}>
            Modular widget registration. In this demo, a Weather Widget is registered at the top level.
          </Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Note: Widgets must be added from your device's widget gallery after running a development build.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Updates</Text>
          <Text style={styles.description}>
            Live Activities can be updated remotely via APNs/FCM tokens provided by Voltra.
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>const {'{ pushToken }'} = useLiveActivity(...);</Text>
          </View>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 24,
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  dotActive: {
    backgroundColor: '#10B981',
  },
  dotInactive: {
    backgroundColor: '#D1D5DB',
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInactive: {
    backgroundColor: '#3B82F6',
  },
  buttonActive: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
    fontWeight: '500',
  },
  codeBlock: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#374151',
  },
});
