import { View, ViewProps } from 'react-native';
import { cn, tokens, useTheme } from '@dls';

type DividerProps = ViewProps & {
  className?: string;
};

export function Divider({ className, ...props }: DividerProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      className={cn(
        tokens.divider.thickness,
        tokens.divider.width,
        theme.border,
        tokens.spacing.divider,
        className,
      )}
    />
  );
}
