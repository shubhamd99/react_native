import { Text as RNText, TextProps } from 'react-native';
import { cn, useTheme } from '@dls';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

type Props = TextProps & {
  variant?: TextVariant;
  className?: string;
};

const variants: Record<TextVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  body: 'text-base',
  caption: 'text-sm',
};

export function Text({ className, variant = 'body', ...props }: Props) {
  const theme = useTheme();

  const isCaption = variant === 'caption';

  return (
    <RNText
      {...props}
      className={cn(
        variants[variant],
        isCaption ? theme.border : theme.text,
        className,
      )}
    />
  );
}
