import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ className = "", error, ...props }) => {
  return (
    <View className="w-full">
      <RNTextInput
        className={`border ${error ? 'border-red-500' : 'border-slate-300'} rounded-md px-3 py-2 text-slate-900 bg-white focus:border-blue-500 ${className}`}
        placeholderTextColor="#94a3b8"
        {...props}
      />
    </View>
  );
};

export { Input };
