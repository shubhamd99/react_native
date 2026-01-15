export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type Theme = {
  button: Record<ButtonVariant, string>;
  buttonText: {
    solid: string;
    ghost: string;
  };
  input: {
    background: string;
    border: string;
    text: string;
    placeholder: string;
    focusBorder: string;
  };
  background: string;
  text: string;
  card: string;
  border: string;
};

export const lightTheme: Theme = {
  button: {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-secondary',
    danger: 'bg-brand-danger',
    ghost: 'bg-transparent',
  },
  input: {
    background: 'bg-white',
    border: 'border-gray-300',
    text: 'text-gray-900',
    placeholder: 'placeholder:text-gray-400',
    focusBorder: 'focus:border-brand-primary',
  },
  buttonText: {
    solid: 'text-white',
    ghost: 'text-brand-primary',
  },

  background: 'bg-white',
  text: 'text-gray-900',
  card: 'bg-gray-50',
  border: 'border-gray-200',
};

export const darkTheme: Theme = {
  button: {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-secondary',
    danger: 'bg-brand-danger',
    ghost: 'bg-transparent',
  },
  input: {
    background: 'bg-gray-900',
    border: 'border-gray-700',
    text: 'text-white',
    placeholder: 'placeholder:text-gray-500',
    focusBorder: 'focus:border-brand-secondary',
  },
  buttonText: {
    solid: 'text-white',
    ghost: 'text-brand-secondary',
  },
  background: 'bg-black',
  text: 'text-white',
  card: 'bg-gray-900',
  border: 'border-gray-800',
};
