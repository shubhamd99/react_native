import { TextInput, TextInputProps } from 'react-native';
import { cn, tokens, useTheme } from '@dls';

type InputProps = TextInputProps & {
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  const theme = useTheme();

  return (
    <TextInput
      {...props}
      className={cn(
        'border',
        tokens.radius.md,
        tokens.spacing.md,
        theme.input.background,
        theme.input.border,
        theme.input.text,
        theme.input.placeholder,
        theme.input.focusBorder,
        className,
      )}
    />
  );
}
