import { View, ViewProps } from 'react-native';
import { cn, tokens, useTheme } from '../../dls';

type ScreenProps = ViewProps & {
  className?: string;
  padded?: boolean;
};

export function Screen({ className, padded = true, ...props }: ScreenProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      className={cn(
        'flex-1', // structural
        theme.background, // theme controls surface
        padded && tokens.spacing.lg, // token padding
        className,
      )}
    />
  );
}
