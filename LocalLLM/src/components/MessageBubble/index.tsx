/**
 * @file MessageBubble component.
 * Renders an individual chat message, with different styling for the user and the assistant.
 */

// React
import React from 'react';

// React Native
import { View, Text } from 'react-native';

// Styles
import { styles } from './MessageBubble.styles';

/**
 * Props for the MessageBubble component.
 */
interface MessageBubbleProps {
  /** The role of the message sender */
  role: 'user' | 'assistant';
  /** The text content of the message */
  content: string;
}

/**
 * MessageBubble component.
 * Handles left/right alignment and avatar display based on the sender's role.
 * 
 * @param {MessageBubbleProps} props - Component props.
 * @returns {React.FC} The rendered message bubble.
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowRight : styles.rowLeft]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AI</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
