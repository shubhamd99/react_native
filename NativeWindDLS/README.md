# 🧱 React Native Design Language System (DLS)

Built with NativeWind v4 + Tailwind + Tokens + Theme

This project contains a production-grade Design Language System (DLS) for React Native using:

⚡ NativeWind v4

🎨 Tailwind

🧱 Token-based design system

🌗 Theme-based color system (Light / Dark)

🧩 Typed, reusable UI primitives

🏗️ Enterprise-grade architecture

## ✨ What This Gives You

✅ Centralized design tokens (spacing, radius, layout rules)

✅ Centralized theme system (colors, surfaces, borders, text)

✅ No hardcoded UI values inside components

✅ Light / Dark mode support

✅ Absolute imports (@/dls, @/components)

✅ Scalable, maintainable UI foundation

## 📁 Folder Structure

```sql
src/
 ├── dls/
 │    ├── tokens.ts
 │    ├── theme.ts
 │    ├── useTheme.ts
 │    ├── utils.ts
 │    └── index.ts
 │
 ├── components/
 │    ├── ui/
 │    │    ├── Button.tsx
 │    │    ├── Card.tsx
 │    │    ├── Text.tsx
 │    │    ├── Input.tsx
 │    │    ├── Divider.tsx
 │    │    ├── Stack.tsx
 │    │    └── index.ts
 │    │
 │    ├── layout/
 │    │    ├── Screen.tsx
 │    │    └── index.ts
 │    │
 │    └── index.ts
 │
 ├── screens/
 │    └── DlsDemo.tsx
 │
 └── App.tsx

```

## 🎨 Design Architecture

1️⃣ Tokens = Shape & Spacing

`src/dls/tokens.ts`

- Tokens control:
- Spacing
- Radius
- Layout rhythm
- Divider structure
- Stack gaps

```tsx
export const tokens = {
  spacing: {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
    divider: 'my-4',
    stack: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
  },
  radius: {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  },
  divider: {
    thickness: 'h-px',
    width: 'w-full',
  },
};
```

2️⃣ Theme = Colors & Surfaces

`src/dls/theme.ts`

- Theme controls:
- Background
- Text
- Card
- Borders
- Buttons
- Inputs

```tsx
export const lightTheme = {
  background: 'bg-white',
  text: 'text-gray-900',
  card: 'bg-gray-50',
  border: 'border-gray-200',

  button: {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-secondary',
    danger: 'bg-brand-danger',
    ghost: 'bg-transparent',
  },

  buttonText: {
    solid: 'text-white',
    ghost: 'text-brand-primary',
  },

  input: {
    background: 'bg-white',
    border: 'border-gray-300',
    text: 'text-gray-900',
    placeholder: 'placeholder:text-gray-400',
    focusBorder: 'focus:border-brand-primary',
  },
};
```

Dark theme mirrors the same structure.

3️⃣ Theme Hook

`src/dls/useTheme.ts`

```tsx
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
```

4️⃣ DLS Public API (Barrel File)

`src/dls/index.ts`

```tsx
export * from './tokens';
export * from './theme';
export * from './utils';
export * from './useTheme';
```

Usage

```tsx
import { tokens, useTheme, cn } from '@/dls';
```

## 🧩 Core UI Components

All components follow this rule:

❌ No hardcoded colors
❌ No hardcoded spacing
❌ No hardcoded radius
✅ Colors from theme
✅ Layout from tokens

🔘 Button

- Token driven spacing & radius
- Theme driven colors
- Variants: primary | secondary | danger | ghost
- Supports disabled

```tsx
<Button title="Save" />
<Button title="Delete" variant="danger" />
<Button title="Cancel" variant="ghost" />
```

🧾 Card

- Uses theme.card and theme.border
- Uses tokens.radius and tokens.spacing

✍️ Text

- Typography variants: h1 | h2 | h3 | body | caption
- Colors come from theme
- No hardcoded text colors

📥 Input

- Background, border, text, placeholder from theme
- Padding & radius from tokens

➖ Divider

- Thickness, width, spacing from tokens
- Color from theme

🧱 Stack (Layout System)

```tsx
<VStack gap="lg">
  <Text variant="h1">Title</Text>
  <Button title="Continue" />
</VStack>

<HStack justify="between" align="center">
  <Text>Left</Text>
  <Button title="Save" />
</HStack>
```

- Tokenized gap system
- Semantic align & justify props

🖥️ Screen

Every screen must start with:

```tsx
<Screen>...</Screen>
```

Applies:

- flex-1
- theme.background

Token padding:

- Can disable padding with:

```tsx
<Screen padded={false} />
```

📱 Demo Screen

`src/screens/DlsDemo.tsx`

A full UI built only using DLS components:

- Header
- Card
- Inputs
- Buttons
- Divider
- Stack layouts

## 🧠 Architectural Rules

❌ Never use:

```tsx
bg - white;
p - 4;
text - black;
border - gray - 200;
```

✅ Always use:

```tsx
theme.*
tokens.*
```

## 🔮 Next Improvements

- Theme toggle
- Typography tokens
- Badge / Chip
- Avatar
- Modal / BottomSheet
- Animation tokens
