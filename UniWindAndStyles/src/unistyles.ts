import { StyleSheet } from 'react-native-unistyles';
import { lightTheme, darkTheme } from './theme';

// 1. Define your breakpoints (calculated natively in C++)
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
} as const;

// 2. Extract types for TypeScript support
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// 3. Augment the 'react-native-unistyles' module to get full autocompletion
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

// 4. Configure Unistyles (Must be called before any StyleSheet.create)
StyleSheet.configure({
  breakpoints,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    // adaptiveThemes: true enables automatic switching based on system light/dark mode
    // Note: initialTheme and adaptiveThemes are mutually exclusive in v3
    adaptiveThemes: true,
  },
});
