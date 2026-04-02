/**
 * @file Styles for the Playground screen.
 * Defines the layout for configuration inputs, preset chips, and output cards.
 */

// React Native
import { StyleSheet, Platform } from 'react-native';

/**
 * StyleSheet for the Playground screen components.
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
  /** Label text for each configuration section */
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
    marginTop: 4,
  },
  /** Horizontal container for preset chips */
  presetRow: {
    gap: 8,
    marginBottom: 20,
    paddingRight: 4,
  },
  /** Individual preset selection chip */
  presetChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  /** Text inside a preset chip */
  presetText: {
    fontSize: 13,
    color: '#4338CA',
    fontWeight: '600',
  },
  /** TextInput specialized for the system prompt */
  systemInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 80,
    lineHeight: 20,
    marginBottom: 16,
  },
  /** TextInput specialized for the user message */
  userInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 80,
    lineHeight: 20,
    marginBottom: 20,
  },
  /** Button to trigger on-device inference */
  runBtn: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  /** Style for the run button when disabled */
  runBtnDisabled: {
    opacity: 0.4,
  },
  /** Text inside the run button */
  runBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  /** Card container for the inference output */
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  /** Header for the output card */
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
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  /** Text inside the on-device badge */
  onDeviceBadgeText: {
    fontSize: 12,
    color: '#4338CA',
    fontWeight: '600',
  },
  /** The generated response text */
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  /** Informational card explaining API differences */
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#6C63FF',
  },
  /** Title for the informational tip card */
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  /** Body text for the tip card */
  tipBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 21,
  },
  /** Monospaced code style for inline code snippets */
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#6C63FF',
  },
});
