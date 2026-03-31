import React from 'react';
import { View, ViewProps } from 'react-native';

interface BoxProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ className = "", children, ...props }) => {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
};

export { Box };
