/**
 * @file Styles for the Summarize screen.
 * Defines the layout for the text input area and the formatted output card.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the Summarize screen components.
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
  /** Multi-line text input area */
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 180,
    lineHeight: 21,
  },
  /** Row container for action buttons */
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    marginBottom: 20,
  },
  /** Button to load sample text */
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
  /** Button to trigger summarization */
  summarizeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
  },
  /** Opacity change for disabled buttons */
  btnDisabled: {
    opacity: 0.4,
  },
  /** Text inside the summarize button */
  summarizeBtnText: {
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
    borderColor: '#FDE68A',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  /** Header part of the output card */
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
  /** The generated summary text */
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  /** Information box for user hints */
  hintBox: {
    backgroundColor: '#FFFBEB',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  /** Text inside the hint box */
  hintText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 20,
  },
});
