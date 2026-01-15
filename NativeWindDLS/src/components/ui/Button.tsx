import { Pressable, Text, PressableProps } from 'react-native';
import { ButtonVariant, cn, tokens, useTheme } from '../../dls';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const isGhost = variant === 'ghost';

  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={cn(
        tokens.radius.lg,
        'items-center justify-center active:opacity-80',
        theme.button[variant],
        tokens.spacing[size],
        disabled && 'opacity-50',
        className,
      )}
    >
      <Text
        className={cn(
          'font-semibold',
          isGhost ? theme.buttonText.ghost : theme.buttonText.solid,
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
}
