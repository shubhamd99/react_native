import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export const UnistylesComponent: React.FC = () => {
  // useUnistyles hook gives access to the current theme and runtime (screen, insets, etc.)
  const { theme } = useUnistyles();
  
  // useVariants method selects specific variant groups for the component
  styles.useVariants({
    color: 'secondary',
    size: 'medium',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unistyles Example</Text>
      <Text style={styles.text}>Current theme is: {theme.colors.background === '#ffffff' ? 'Light' : 'Dark'}</Text>
      
      <View style={styles.box} />

      <View style={styles.responsiveContainer}>
        <Text style={styles.responsiveText}>
          I change size based on breakpoints!
        </Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Click me (I use variants!)</Text>
      </Pressable>
    </View>
  );
};

// StyleSheet.create allows accessing the theme and miniRuntime (rt) as arguments
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  text: {
    color: theme.colors.typography,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.secondary,
    marginVertical: theme.spacing.md,
    borderRadius: 10,
  },
  responsiveContainer: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.sm,
    borderRadius: 4,
    // Breakpoints: values change automatically based on device screen width
    width: {
      xs: '100%',
      sm: '80%',
      md: '60%',
    },
  },
  responsiveText: {
    color: '#fff',
    fontSize: {
      xs: 12,
      sm: 16,
      md: 20,
    },
  },
  button: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: 4,
    // Variants: pre-defined style variations selected via useVariants hook
    variants: {
      color: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        accent: {
          backgroundColor: theme.colors.accent,
        },
      },
      size: {
        small: {
          padding: 4,
        },
        medium: {
          padding: 10,
        },
        large: {
          padding: 20,
        },
      },
    },
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
}));
