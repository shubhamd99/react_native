/**
 * @file Styles for the MessageBubble component.
 * Defines the chat layout including bubble colors, alignment, and avatar sizing.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the MessageBubble component.
 */
export const styles = StyleSheet.create({
  /** Horizontal container for the bubble and optional avatar */
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  /** Right-aligned row for user messages */
  rowRight: {
    justifyContent: 'flex-end',
  },
  /** Left-aligned row for assistant messages */
  rowLeft: {
    justifyContent: 'flex-start',
  },
  /** Circular avatar container for the assistant */
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 2,
  },
  /** Short text label inside the avatar */
  avatarText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  /** Main message bubble container */
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  /** Style specific to user message bubbles */
  userBubble: {
    backgroundColor: '#6C63FF',
    borderBottomRightRadius: 4,
  },
  /** Style specific to assistant message bubbles */
  assistantBubble: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 4,
  },
  /** Text style for the message content */
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  /** Text color for user messages */
  userText: {
    color: '#FFF',
  },
  /** Text color for assistant messages */
  assistantText: {
    color: '#1A1A1A',
  },
});
