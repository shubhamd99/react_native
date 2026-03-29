import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../NitroScreen.styles';
import { User, UserRole } from '../../specs/UserModule.nitro';

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case UserRole.USER: return 'User';
    case UserRole.ADMIN: return 'Admin';
    case UserRole.GUEST: return 'Guest';
    default: return 'Unknown';
  }
};

interface UserCardProps {
  onRegister: () => void;
  onFetchRemote: () => void;
  onClear: () => void;
  lastUser: User | null;
  usersCount: number;
  isLoading: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  onRegister, 
  onFetchRemote, 
  onClear, 
  lastUser, 
  usersCount, 
  isLoading 
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Complex Objects & Enums</Text>
    <Text style={styles.description}>
      Nitro automatically converts structs, arrays, and enums.
    </Text>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Register Random</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={onFetchRemote}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Fetch Remote</Text>
        )}
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={onClear}>
      <Text style={styles.buttonText}>Clear All Users</Text>
    </TouchableOpacity>

    {lastUser && (
      <View style={styles.userCard}>
        <Text style={styles.userLabel}>Last Action User:</Text>
        <Text style={styles.userInfo}>ID: {lastUser.id}</Text>
        <Text style={styles.userInfo}>Name: {lastUser.name}</Text>
        <Text style={styles.userInfo}>Role: {getRoleLabel(lastUser.role)}</Text>
        <Text style={styles.userInfo}>Tags: {lastUser.tags.join(', ')}</Text>
      </View>
    )}

    <Text style={styles.resultText}>
      Local Users Count: <Text style={styles.highlight}>{usersCount}</Text>
    </Text>
  </View>
);
