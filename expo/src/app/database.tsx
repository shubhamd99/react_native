import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system/legacy';
import { Paths } from 'expo-file-system';
import { databaseStyles as styles } from '@/styles/database.styles';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Section } from '@/components/Section';

interface User {
  id: number;
  name: string;
}

export default function DatabaseScreen() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fileInfo, setFileInfo] = useState<string>('Not checked');

  useEffect(() => {
    async function setup() {
      const database = await SQLite.openDatabaseAsync('test.db');
      setDb(database);
      
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
      `);
      
      refreshUsers(database);
    }
    setup();
  }, []);

  const refreshUsers = async (database: SQLite.SQLiteDatabase) => {
    const allRows = await database.getAllAsync<User>('SELECT * FROM users');
    setUsers(allRows);
  };

  const addUser = async () => {
    if (!db) return;
    const name = `User ${Math.floor(Math.random() * 1000)}`;
    await db.runAsync('INSERT INTO users (name) VALUES (?)', name);
    refreshUsers(db);
  };

  const clearDatabase = async () => {
    if (!db) return;
    await db.runAsync('DELETE FROM users');
    refreshUsers(db);
  };

  const checkFileSystem = async () => {
    try {
      const docDir = Paths.document.uri;
      const fileUri = `${docDir}/example.txt`;
      const content = 'Hello from Expo FileSystem at ' + new Date().toISOString();
      await FileSystem.writeAsStringAsync(fileUri, content);
      const readContent = await FileSystem.readAsStringAsync(fileUri);
      const info = await FileSystem.getInfoAsync(fileUri);
      const size = info.exists ? info.size : 0;
      setFileInfo(`File size: ${size} bytes\nContent: ${readContent}`);
    } catch (error) {
      console.error(error);
      setFileInfo('Error accessing file system');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Section title="SQLite (Persistent DB)">
        <Text style={styles.text}>
          SQLlite is best for structured data, filtering, and large datasets.
        </Text>
        <PrimaryButton title="Add Random User" icon="person-add-outline" onPress={addUser} />
        <PrimaryButton title="Clear All Users" icon="trash-outline" secondary onPress={clearDatabase} />
        <Text style={styles.title}>Users in DB:</Text>
        {users.length === 0 ? (
          <Text style={styles.emptyText}>No users yet.</Text>
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.itemRow}>
              <Text style={styles.itemText}>{user.name}</Text>
              <Text style={styles.text}>ID: {user.id}</Text>
            </View>
          ))
        )}
      </Section>
      <Section title="FileSystem (File Access)">
        <Text style={styles.text}>
          FileSystem is used for large binary data, images, logs, or custom files.
        </Text>
        <PrimaryButton title="Write & Read File" icon="document-text-outline" onPress={checkFileSystem} />
        <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}>
          <Text style={{ fontFamily: 'SpaceMono', fontSize: 12 }}>{fileInfo}</Text>
        </View>
      </Section>
    </ScrollView>
  );
}
