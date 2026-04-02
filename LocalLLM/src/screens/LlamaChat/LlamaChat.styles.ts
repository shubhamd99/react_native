/**
 * @file Styles for the LlamaChat screen.
 * Defines the layout for the chat interface with specific branding for llama.rn.
 */

// React Native
import { StyleSheet, Platform } from 'react-native';

/**
 * StyleSheet for the LlamaChat screen components.
 */
export const styles = StyleSheet.create({
  /** Root container for the screen */
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  /** Top bar for model status and clear button */
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
  /** Button to reset the chat */
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  /** Text within the clear button */
  clearBtnText: {
    fontSize: 13,
    color: '#666',
  },
  /** Informational strip showing library and model details */
  infoStrip: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FED7AA',
  },
  /** Monospaced text for technical details */
  infoText: {
    fontSize: 11,
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  /** State displayed when no messages exist */
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  /** Emoji/Icon for the empty state */
  emptyIcon: {
    fontSize: 48,
    marginBottom: 14,
  },
  /** Title text for the empty state */
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  /** Description text for the empty state */
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
  /** Individual suggestion chip */
  suggestion: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  /** Text within the suggestion chip */
  suggestionText: {
    fontSize: 14,
    color: '#444',
  },
  /** List container styling */
  messageList: {
    paddingVertical: 12,
    paddingBottom: 20,
  },
  /** Bottom bar for message input and send button */
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
  /** Multi-line message input */
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
  /** Circular button for sending messages */
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Disabled state for the send button */
  sendBtnDisabled: {
    backgroundColor: '#FED7AA',
  },
  /** Specialized style for the stop generation button */
  stopBtn: {
    backgroundColor: '#EF4444',
  },
  /** Text or icon inside the action button */
  sendBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
});
