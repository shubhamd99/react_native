import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusRowProps {
  label: string;
  status: boolean | null;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, status }) => {
  let color = 'gray';
  let text = 'Checking...';

  if (status === true) {
    color = 'red';
    text = 'DETECTED';
  } else if (status === false) {
    color = 'green';
    text = 'SAFE';
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.status, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusRow;
