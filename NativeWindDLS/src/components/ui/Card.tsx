import { View, ViewProps } from 'react-native';
import { cn, tokens, useTheme } from '../../dls';

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className, ...props }: CardProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      className={cn(
        theme.card,
        theme.border,
        'border',
        tokens.radius.lg,
        tokens.spacing.md,
        className,
      )}
    />
  );
}
