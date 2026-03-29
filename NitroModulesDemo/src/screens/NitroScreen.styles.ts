import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#212529',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#343A40',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#495057',
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 0.48,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  asyncButton: {
    backgroundColor: '#5856D6',
    flex: 1,
    width: '100%',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginTop: 10,
    textAlign: 'center',
  },
  highlight: {
    color: '#007AFF',
    fontWeight: '800',
  },
  userCard: {
    backgroundColor: '#F1F3F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  userLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 13,
    color: '#212529',
  },
  footer: {
    marginTop: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#ADB5BD',
    lineHeight: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
