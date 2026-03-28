import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface PrimaryButtonProps {
  onPress?: () => void;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secondary?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton = ({ onPress, title, icon, secondary, style }: PrimaryButtonProps) => {
  return (
    <Pressable 
      style={[
        styles.button, 
        secondary && styles.secondaryButton,
        style
      ]} 
      onPress={onPress}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={24} 
          color={secondary ? Colors.black : Colors.white} 
          style={styles.icon} 
        />
      )}
      <Text style={[
        styles.buttonText, 
        secondary && styles.secondaryButtonText
      ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.black,
  },
  icon: {
    marginRight: 8,
  }
});
