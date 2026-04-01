import React from 'react';
import { Voltra, VoltraAndroid } from 'voltra';
import { Platform } from 'react-native';

type VoltraStyle = React.ComponentProps<typeof Voltra.VStack>['style'];

/**
 * Platform-aware Vertical Stack
 */
export const VStack: React.FC<{
  children: React.ReactNode;
  style?: VoltraStyle;
  verticalAlignment?: 'top' | 'center-vertically' | 'bottom';
  horizontalAlignment?: 'leading' | 'center-horizontally' | 'trailing';
}> = ({ children, style, verticalAlignment, horizontalAlignment }) => {
  if (Platform.OS === 'android') {
    return (
      <VoltraAndroid.Column
        style={style as any}
        verticalAlignment={verticalAlignment}
        // Map 'leading'/'trailing' to 'start'/'end' for Android Glance
        horizontalAlignment={
          horizontalAlignment === 'leading' ? 'start' : 
          horizontalAlignment === 'trailing' ? 'end' : 
          horizontalAlignment === 'center-horizontally' ? 'center-horizontally' : undefined
        }
      >
        {children}
      </VoltraAndroid.Column>
    );
  }
  
  // iOS Voltra.VStack uses 'alignment' for horizontal alignment
  const iosAlignment = 
    horizontalAlignment === 'center-horizontally' ? 'center' : 
    horizontalAlignment;

  return (
    <Voltra.VStack 
      style={style} 
      alignment={iosAlignment as any}
    >
      {children}
    </Voltra.VStack>
  );
};

/**
 * Platform-aware Horizontal Stack
 */
export const HStack: React.FC<{
  children: React.ReactNode;
  style?: VoltraStyle;
  verticalAlignment?: 'top' | 'center-vertically' | 'bottom';
  horizontalAlignment?: 'leading' | 'center-horizontally' | 'trailing';
}> = ({ children, style, verticalAlignment, horizontalAlignment }) => {
  if (Platform.OS === 'android') {
    return (
      <VoltraAndroid.Row
        style={style as any}
        verticalAlignment={verticalAlignment}
        horizontalAlignment={
          horizontalAlignment === 'leading' ? 'start' : 
          horizontalAlignment === 'trailing' ? 'end' : 
          horizontalAlignment === 'center-horizontally' ? 'center-horizontally' : undefined
        }
      >
        {children}
      </VoltraAndroid.Row>
    );
  }

  // iOS Voltra.HStack uses 'alignment' for vertical alignment
  const iosAlignment = 
    verticalAlignment === 'center-vertically' ? 'center' : 
    verticalAlignment;

  return (
    <Voltra.HStack 
      style={style} 
      alignment={iosAlignment as any}
    >
      {children}
    </Voltra.HStack>
  );
};

/**
 * Reusable Card component for Voltra UIs.
 */
export const Card: React.FC<{
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
}> = ({ children, backgroundColor = '#1F2937', padding = 16, borderRadius = 16 }) => {
  return (
    <VStack
      style={{
        backgroundColor,
        padding,
        borderRadius,
        width: Platform.OS === 'android' ? '100%' : undefined,
      }}
      verticalAlignment="center-vertically"
    >
      {children}
    </VStack>
  );
};

/**
 * Status Badge for widgets/activities
 */
export const StatusBadge: React.FC<{
  text: string;
  color: string;
}> = ({ text, color }) => {
  if (Platform.OS === 'android') {
    return (
      <HStack
        style={{
          backgroundColor: color,
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
        verticalAlignment="center-vertically"
      >
        <VoltraAndroid.Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          {text}
        </VoltraAndroid.Text>
      </HStack>
    );
  }

  return (
    <HStack
      style={{
        backgroundColor: color,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
      }}
      verticalAlignment="center-vertically"
    >
      <Voltra.Text
        style={{
          color: 'white',
          fontSize: 12,
          fontWeight: '700',
        }}
      >
        {text}
      </Voltra.Text>
    </HStack>
  );
};

/**
 * Action Button for Interactive Widgets
 */
export const ActionButton: React.FC<{
  label: string;
  onPress: () => void;
  color?: string;
}> = ({ label, onPress, color = '#3B82F6' }) => {
  if (Platform.OS === 'android') {
    return (
      <HStack
        style={{
          backgroundColor: color,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        }}
        onPress={onPress}
        verticalAlignment="center-vertically"
      >
        <VoltraAndroid.Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          {label}
        </VoltraAndroid.Text>
      </HStack>
    );
  }

  return (
    <HStack
      style={{
        backgroundColor: color,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
      }}
      onPress={onPress}
      verticalAlignment="center-vertically"
    >
      <Voltra.Text
        style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {label}
      </Voltra.Text>
    </HStack>
  );
};
