/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { useAnalyticsController } from './src/controllers/AnalyticsController';
import { AppStyles } from './src/styles/AppStyles';

function App(): React.JSX.Element {
  const {
    log,
    queueLength,
    handleSendEvent,
    handleSendBatch,
    refreshQueueLength,
  } = useAnalyticsController();

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.content}>
        <Text style={AppStyles.title}>Analytics Tester</Text>

        <View style={AppStyles.queueContainer}>
          <Text style={AppStyles.queueText}>
            Native Queue Length: {queueLength}
          </Text>
          <Button title="Refresh Queue" onPress={refreshQueueLength} />
        </View>

        <View style={AppStyles.buttonContainer}>
          <Button title="Send Single Event" onPress={handleSendEvent} />
        </View>

        <View style={AppStyles.buttonContainer}>
          <Button
            title="Send Batch (10)"
            onPress={handleSendBatch}
            color="orange"
          />
        </View>

        <Text style={AppStyles.subtitle}>Log (Recent 20):</Text>
        <ScrollView style={AppStyles.logContainer}>
          {log.map((item, index) => (
            <Text key={index} style={AppStyles.logItem}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default App;
