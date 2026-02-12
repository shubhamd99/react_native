import { useState } from 'react';
import { Alert } from 'react-native';
import NativeAnalytics from '../specs/NativeAnalytics';
import { AnalyticsEvent } from '../types/AnalyticsTypes';

export const useAnalyticsController = () => {
  const [log, setLog] = useState<string[]>([]);
  const [queueLength, setQueueLength] = useState<number>(0);

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 20));
  };

  const refreshQueueLength = async () => {
    try {
      const length = await NativeAnalytics.getQueueLength();
      setQueueLength(length);
    } catch (e: any) {
      console.error('Failed to get queue length', e);
    }
  };

  const generateRandomEvent = (
    namePrefix: string = 'test_event_',
  ): AnalyticsEvent => {
    const timestamp = Date.now();
    return {
      schemaVersion: '1.0',
      objectName: namePrefix + Math.floor(Math.random() * 1000),
      objectValue: {
        timestamp,
        randomValue: Math.random(),
        screen: 'HomeScreen',
      },
      userId: 'user_' + Math.floor(Math.random() * 100),
      screenName: 'Home',
      context: 'testing_ui',
    };
  };

  const handleSendEvent = () => {
    try {
      const event = generateRandomEvent();
      NativeAnalytics.sendAnalyticsEvent(event);
      addLog(`Sent: ${event.objectName}`);
      refreshQueueLength();
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
      Alert.alert('Error', e.message);
    }
  };

  const handleSendBatch = () => {
    try {
      for (let i = 0; i < 10; i++) {
        const event = generateRandomEvent('batch_event_');
        NativeAnalytics.sendAnalyticsEvent(event);
      }
      addLog('Sent 10 batch events');
      refreshQueueLength();
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  return {
    log,
    queueLength,
    handleSendEvent,
    handleSendBatch,
    refreshQueueLength,
  };
};
