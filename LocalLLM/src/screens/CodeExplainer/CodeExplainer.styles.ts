/**
 * @file Styles for the Code Explainer screen.
 * Defines the layout for the monospaced code input and the formatted output card.
 */

// React Native
import { StyleSheet, Platform } from 'react-native';

/**
 * StyleSheet for the Code Explainer screen components.
 */
export const styles = StyleSheet.create({
  /** Root container for the screen */
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  /** ScrollView styling */
  scroll: {
    flex: 1,
  },
  /** Content container for the screen padding */
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  /** Row containing the model loader status */
  statusRow: {
    marginBottom: 16,
  },
  /** Label text for input sections */
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  /** Specialized TextInput for code, using monospaced font */
  codeInput: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 14,
    fontSize: 13,
    color: '#CDD6F4',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    minHeight: 200,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#313244',
  },
  /** Row container for action buttons */
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    marginBottom: 20,
  },
  /** Button to load a sample code snippet */
  sampleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  /** Text inside the sample button */
  sampleBtnText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  /** Button to trigger code explanation */
  explainBtn: {
    flex: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  /** Opacity change for disabled buttons */
  btnDisabled: {
    opacity: 0.4,
  },
  /** Text inside the explain button */
  explainBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  /** Card container for the generated output */
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#EF4444',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  /** Header for the explanation output card */
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  /** Label for the output card */
  outputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  /** Badge indicating on-device processing */
  onDeviceBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  /** Text inside the on-device badge */
  onDeviceBadgeText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  /** The generated explanation text */
  outputText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  /** Container for usage tips displayed when empty */
  tipsCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    gap: 6,
  },
  /** Title for the tips section */
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7F1D1D',
    marginBottom: 4,
  },
  /** Individual tip text */
  tipText: {
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 20,
  },
});
