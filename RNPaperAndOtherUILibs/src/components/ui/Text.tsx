import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  bold?: boolean;
}

const Text: React.FC<TextProps> = ({ 
  className = "", 
  children, 
  size = 'md',
  bold = false,
  ...props 
}) => {
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    '2xl': "text-2xl",
    '3xl': "text-3xl",
    '4xl': "text-4xl",
  };

  return (
    <RNText 
      className={`${sizeStyles[size]} ${bold ? "font-bold" : "font-normal"} text-slate-900 ${className}`} 
      {...props}
    >
      {children}
    </RNText>
  );
};

export { Text };
