import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogViewerProps {
  logs: string[];
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <View style={styles.logs}>
      <Text style={styles.subtitle}>Logs</Text>
      {logs.map((l, i) => (
        <Text key={i} style={styles.logItem}>
          {l}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  logs: {
    marginTop: 20,
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  logItem: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
});
