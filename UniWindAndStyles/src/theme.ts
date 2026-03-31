// Theme definitions for Unistyles
// These are used by both Unistyles and Uniwind (via the shared C++ engine)

export const lightTheme = {
  colors: {
    typography: '#000000',
    background: '#ffffff',
    primary: '#0070f3',
    secondary: '#ff0080',
    accent: '#7928ca',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

export const darkTheme = {
  colors: {
    typography: '#ffffff',
    background: '#000000',
    primary: '#0070f3',
    secondary: '#ff0080',
    accent: '#7928ca',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

export type AppTheme = typeof lightTheme;
