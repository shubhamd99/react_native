import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  }
});
