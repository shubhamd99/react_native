import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNitroDemo } from './hooks/useNitroDemo';
import { styles } from './NitroScreen.styles';
import { InfoCard } from './components/InfoCard';
import { MathCard } from './components/MathCard';
import { UserCard } from './components/UserCard';
import { AsyncCard } from './components/AsyncCard';

export const NitroScreen: React.FC = () => {
  const { 
    nativeValue, syncResult, asyncResult, loading,
    usersCount, lastUser, isUserLoading,
    add, multiply, runAsync, registerUser, fetchRemoteUser, clearUsers
  } = useNitroDemo();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nitro Modules Demo</Text>
        <Text style={styles.subtitle}>High Performance Hybrid Objects (JSI)</Text>

        <InfoCard nativeValue={nativeValue} />

        <UserCard 
          onRegister={registerUser}
          onFetchRemote={fetchRemoteUser}
          onClear={clearUsers}
          lastUser={lastUser}
          usersCount={usersCount}
          isLoading={isUserLoading}
        />

        <MathCard 
          onAdd={add}
          onMultiply={multiply}
          result={syncResult}
        />

        <AsyncCard 
          onRun={runAsync}
          result={asyncResult}
          isLoading={loading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Nitro Modules eliminate the bridge overhead by using direct JSI calls,
            enabling seamless C++, Swift, and Kotlin integration.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
