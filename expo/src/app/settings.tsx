import React from 'react';
import { Text, View, ScrollView, Switch, Pressable, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { settingsStyles as styles } from '@/styles/settings.styles';
import { Section } from '@/components/Section';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';

const isExpoGo = Constants.executionEnvironment === 'storeClient';
const isAndroid = Platform.OS === 'android';
const canUseNotifications = !(isExpoGo && isAndroid);

const getNotifications = () => {
  if (canUseNotifications) {
    return require('expo-notifications');
  }
  return null;
};

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  React.useEffect(() => {
    const Notifications = getNotifications();
    if (Notifications) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    }
  }, []);

  const scheduleTestNotification = async () => {
    const Notifications = getNotifications();
    if (!Notifications) {
      alert('Android Push/Local notifications are restricted in Expo Go SDK 53+. Please use a Development Build to test this feature.');
      return;
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Expo Test Notification! 🚀",
          body: 'This is a production-grade local notification demo.',
        },
        trigger: { 
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2 
        } as any,
      });
      alert('Notification scheduled for 2 seconds from now!');
    } catch (e) {
      alert('Failed to schedule notification. This feature requires a Development Build on this device.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Section title="System Integration">
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={24} color={Colors.gray} />
            <Text style={styles.rowText}>Allow Notifications</Text>
          </View>
          <Switch 
            value={notificationsEnabled} 
            onValueChange={setNotificationsEnabled} 
            disabled={!canUseNotifications}
          />
        </View>
        <PrimaryButton 
          title="Push Local Notification" 
          onPress={scheduleTestNotification}
          style={{ marginVertical: 15, opacity: canUseNotifications ? 1 : 0.5 }}
        />
        {!canUseNotifications && (
          <Text style={{ color: '#d97706', fontSize: 12, marginBottom: 10, paddingHorizontal: 5 }}>
            ⚠️ Notifications are disabled in Expo Go on Android. Use a Development Build for full testing.
          </Text>
        )}
        <View style={styles.divider} />
        <Pressable style={styles.row} onPress={() => Linking.openSettings()}>
          <View style={styles.rowLeft}>
            <Ionicons name="settings-outline" size={24} color={Colors.gray} />
            <Text style={styles.rowText}>System App Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.lightGray} />
        </Pressable>
      </Section>
      <Section title="App Info">
        <Text style={styles.infoText}>Expo Linking URL: {Linking.createURL('/')}</Text>
        <Text style={styles.infoText}>Environment: {isExpoGo ? 'Expo Go' : 'Development Build'}</Text>
        <Text style={styles.infoText}>Platform: {Platform.OS} {Platform.Version}</Text>
        <View style={styles.divider} />
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Environment Variables (.env)</Text>
        <Text style={styles.infoText}>API URL: {process.env.EXPO_PUBLIC_API_URL || 'Not Set'}</Text>
        <Text style={styles.infoText}>Analytics: {process.env.EXPO_PUBLIC_ANALYTICS_KEY || 'Not Set'}</Text>
      </Section>
    </ScrollView>
  );
}
