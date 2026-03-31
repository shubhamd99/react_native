import React from 'react';
import { View, Text } from 'react-native';

export const UniwindComponent: React.FC = () => {
  return (
    // Uniwind allows using standard Tailwind v4 utility classes via 'className'
    <View className="p-4 bg-gray-100 rounded-lg border border-gray-300 my-4">
      <Text className="text-xl font-bold text-blue-600 mb-2">Uniwind (Tailwind v4) Example</Text>
      <Text className="text-gray-700">
        This is styled with standard Tailwind classes using the Uniwind engine!
      </Text>
      
      <View className="flex-row mt-4 space-x-2">
        <View className="w-12 h-12 bg-red-500 rounded-full" />
        <View className="w-12 h-12 bg-green-500 rounded-md" />
        <View className="w-12 h-12 bg-yellow-500 rotate-45" />
      </View>

      {/* Responsive prefixes (sm:, md:) are calculated by the C++ engine */}
      <View className="mt-4 p-2 bg-purple-500 rounded sm:bg-orange-500 md:bg-teal-500">
        <Text className="text-white text-center">
          Responsive Tailwind Classes! (Check on different sizes)
        </Text>
      </View>

      {/* Interaction states (active:, group-active:) work natively */}
      <View className="mt-4 group active:bg-blue-200 p-2 rounded">
        <Text className="group-active:text-blue-800">
          Interaction state (Press me!)
        </Text>
      </View>
    </View>
  );
};
