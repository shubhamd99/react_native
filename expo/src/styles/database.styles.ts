import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const databaseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
  },
  section: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  text: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  itemText: {
    fontSize: 16,
    color: Colors.text,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  }
});
