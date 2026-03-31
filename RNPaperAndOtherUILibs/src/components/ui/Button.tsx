import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'solid', 
  size = 'md', 
  isLoading, 
  isDisabled, 
  onPress, 
  className = "" 
}) => {
  const variantStyles = {
    solid: "bg-blue-600 border-blue-600",
    outline: "bg-transparent border border-blue-600",
    ghost: "bg-transparent border-transparent",
    link: "bg-transparent border-transparent",
  };

  const textStyles = {
    solid: "text-white",
    outline: "text-blue-600",
    ghost: "text-blue-600",
    link: "text-blue-600 underline",
  };

  const sizeStyles = {
    xs: "px-2 py-1",
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-6 py-3",
    xl: "px-8 py-4",
  };

  const textSizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      className={`flex-row items-center justify-center rounded-md ${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? "opacity-50" : "active:opacity-80"} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'solid' ? "white" : "#2563eb"} size="small" />
      ) : (
        <Text className={`font-semibold ${textStyles[variant]} ${textSizeStyles[size]}`}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export { Button };
