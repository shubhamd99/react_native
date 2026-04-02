/**
 * @file Styles for the LlamaGenerate screen.
 * Defines the layout for task tabs, language pickers, text inputs, and result cards.
 */

// React Native
import { StyleSheet, Platform } from 'react-native';

/**
 * StyleSheet for the LlamaGenerate screen components.
 */
export const styles = StyleSheet.create({
  /** Root container for the screen */
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  /** ScrollView styling */
  scroll: {
    flex: 1,
  },
  /** Content container for bottom padding */
  content: {
    paddingBottom: 40,
  },
  /** Row containing the model loader status */
  statusRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  /** Informational strip showing library and model details */
  infoStrip: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FED7AA',
    marginBottom: 16,
  },
  /** Monospaced text for technical details */
  infoText: {
    fontSize: 11,
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  /** Horizontal row for task selection tabs */
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  /** Individual task selection tab */
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  /** Style for the active task tab */
  tabActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  /** Icon text inside a task tab */
  tabIcon: {
    fontSize: 16,
  },
  /** Label text inside a task tab */
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  /** Label text style for an active task tab */
  tabLabelActive: {
    color: '#C2410C',
  },
  /** Content container for the language chip picker */
  langPickerContent: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  /** Individual language selection chip */
  langChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  /** Style for the active language chip */
  langChipActive: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  /** Text inside a language chip */
  langChipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  /** Style for text inside an active language chip */
  langChipTextActive: {
    color: '#C2410C',
    fontWeight: '700',
  },
  /** Large TextInput area for user input */
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 160,
    lineHeight: 21,
    marginHorizontal: 16,
  },
  /** Row container for action buttons */
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  /** Button to load a sample input based on the active task */
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
  /** Button to trigger the LLM generation */
  generateBtn: {
    flex: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F97316',
    alignItems: 'center',
  },
  /** Style for the generate button when disabled */
  btnDisabled: {
    opacity: 0.4,
  },
  /** Text inside the generate button */
  generateBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  /** Row containing loading indicator and stop text */
  generatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  /** Card container for the generation output */
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    shadowColor: '#F97316',
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
  /** Badge indicating the Vercel SDK function used */
  sdkBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  /** Text inside the SDK badge */
  sdkBadgeText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  /** The generated result text */
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  /** Row displaying token consumption statistics */
  tokenRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0E0D0',
  },
  /** Text showing input and output token counts */
  tokenText: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  /** Container for the informational explanation card */
  explainCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F97316',
  },
  /** Title for the explanation card */
  explainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  /** Body text for the explanation card */
  explainText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 21,
  },
  /** Bold text style for emphasizing key terms */
  bold: {
    fontWeight: '700',
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
