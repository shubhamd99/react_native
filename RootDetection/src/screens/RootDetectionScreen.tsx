import React from 'react';

import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useRootDetection } from '../hooks/useRootDetection';
import StatusRow from '../components/StatusRow';

const RootDetectionScreen = () => {
  const {
    isJailBroken,
    hookDetected,
    canMockLocation,
    trustFall,
    isDebuggedMode,
    isEmulator,
  } = useRootDetection();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Root Detection Dashboard</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Jail Monkey Checks</Text>
        <StatusRow label="Rooted / Jailbroken:" status={isJailBroken} />
        <StatusRow label="Hook Detection:" status={hookDetected} />
        <StatusRow label="Mock Location:" status={canMockLocation} />
        <StatusRow label="Trust Fall (Suspicious/Mock):" status={trustFall} />
        <StatusRow label="Debugged Mode:" status={isDebuggedMode} />
        <Text style={styles.description}>
          Note: JailMonkey aggregates multiple checks to determine if the device
          is rooted or jailbroken.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Device Info Checks</Text>
        <StatusRow label="Is Emulator:" status={isEmulator} />
        <Text style={styles.description}>
          Note: Emulators are often rooted by default.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Platform: {Platform.OS}</Text>
        <Text style={styles.infoText}>
          System Version: {DeviceInfo.getSystemVersion()}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    fontStyle: 'italic',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
  },
});

export default RootDetectionScreen;
