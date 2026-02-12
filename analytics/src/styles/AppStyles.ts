import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  buttonContainer: {
    marginBottom: 15,
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  logItem: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'monospace',
    color: '#444',
  },
  queueContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  queueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
});
