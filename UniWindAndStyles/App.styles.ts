import { StyleSheet } from 'react-native-unistyles';

// Modular Style Pattern: Styles are kept separate to improve readability and fix ESLint warnings
export const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    color: theme.colors.typography,
    marginBottom: 20,
  },
}));
