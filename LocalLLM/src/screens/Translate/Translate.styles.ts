/**
 * @file Styles for the Translate screen.
 * Defines the layout for the language cards, pickers, and translation output.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the Translate screen components.
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
  /** Card container for source language input */
  langCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 4,
  },
  /** Header for the source language input card */
  langHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  /** Label for the source language */
  langLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  /** TextInput for source language input */
  langInput: {
    padding: 14,
    fontSize: 15,
    color: '#1A1A1A',
    minHeight: 110,
    lineHeight: 22,
  },
  /** Row containing the target selection label and arrow */
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  /** Downward arrow icon separating source and target */
  arrowIcon: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: '700',
  },
  /** Label text for target selection */
  targetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  /** ScrollView containing the horizontal language chips */
  langPicker: {
    marginBottom: 16,
  },
  /** Content container for language chips */
  langPickerContent: {
    gap: 8,
    paddingRight: 4,
  },
  /** Individual language selection chip */
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  /** Style for the active language chip */
  langChipActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  /** Flag icon inside a language chip */
  langChipFlag: {
    fontSize: 16,
  },
  /** Text label inside a language chip */
  langChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  /** Style for the text inside an active language chip */
  langChipTextActive: {
    color: '#065F46',
    fontWeight: '700',
  },
  /** Button to trigger translation */
  translateBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  /** Opacity change for disabled buttons */
  btnDisabled: {
    opacity: 0.4,
  },
  /** Text inside the translate button */
  translateBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  /** Card container for the translation output */
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    shadowColor: '#10B981',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  /** Header for the translation output card */
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  /** Display label for the target language in output */
  outputLang: {
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
  /** The generated translation text */
  outputText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 26,
  },
});
