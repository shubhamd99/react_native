import React from 'react';
import { View, Text } from 'react-native';

export const InfoBox: React.FC = () => {
  return (
    <View className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg border-2 border-yellow-400 dark:border-yellow-700">
      <Text className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
        Why Uni-stack?
      </Text>
      <Text className="text-yellow-700 dark:text-yellow-300 mt-2">
        • Near-native performance (C++ Core)
      </Text>
      <Text className="text-yellow-700 dark:text-yellow-300">
        • Built for the New Architecture (Fabric)
      </Text>
      <Text className="text-yellow-700 dark:text-yellow-300">
        • Tailwind v4 Support (Uniwind)
      </Text>
      <Text className="text-yellow-700 dark:text-yellow-300">
        • Supercharged StyleSheet (Unistyles)
      </Text>
    </View>
  );
};
