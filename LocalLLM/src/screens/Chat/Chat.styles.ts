/**
 * @file Styles for the Chat screen.
 * Defines the layout for the message list, input bar, and empty state.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the Chat screen components.
 */
export const styles = StyleSheet.create({
  /** Root container for the screen */
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  /** Status bar showing model loading progress and clear button */
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  /** Button to clear the chat history */
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  /** Text inside the clear button */
  clearBtnText: {
    fontSize: 13,
    color: '#666',
  },
  /** View displayed when there are no messages */
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  /** Icon/Emoji displayed in the empty state */
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  /** Title text in the empty state */
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  /** Subtitle text in the empty state */
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  /** Container for suggestion buttons */
  suggestions: {
    width: '100%',
    gap: 8,
  },
  /** Individual suggestion button */
  suggestion: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  /** Text inside a suggestion button */
  suggestionText: {
    fontSize: 14,
    color: '#444',
  },
  /** Content container for the message FlatList */
  messageList: {
    paddingVertical: 12,
    paddingBottom: 20,
  },
  /** Horizontal bar containing the text input and send button */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    gap: 8,
  },
  /** TextInput for typing messages */
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1A1A1A',
    maxHeight: 120,
  },
  /** Button to send the current input text */
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Style for the send button when it is disabled */
  sendBtnDisabled: {
    backgroundColor: '#D0CEF5',
  },
  /** Style for the button when it acts as a stop/interrupt button */
  stopBtn: {
    backgroundColor: '#EF4444',
  },
  /** Text/Icon inside the send/stop button */
  sendBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
});
