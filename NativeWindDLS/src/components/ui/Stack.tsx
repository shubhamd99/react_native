import { View, ViewProps } from 'react-native';
import { cn, tokens } from '../../dls';

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type StackProps = ViewProps & {
  gap?: StackGap;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'between' | 'around' | 'evenly';
  className?: string;
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export function VStack({
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  className,
  ...props
}: StackProps) {
  return (
    <View
      {...props}
      className={cn(
        'flex-col',
        tokens.spacing.stack[gap],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
    />
  );
}

export function HStack({
  gap = 'md',
  align = 'center',
  justify = 'start',
  className,
  ...props
}: StackProps) {
  return (
    <View
      {...props}
      className={cn(
        'flex-row',
        tokens.spacing.stack[gap],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
    />
  );
}
