# React Native Paper — Callstack UI Library

**React Native Paper** is a Material Design 3 component library maintained by **Callstack**. See `NativeWindDLS` in this repo for an alternative Tailwind-based approach.

## Setup

```bash
yarn add react-native-paper react-native-vector-icons
# iOS
cd ios && pod install
```

`App.tsx`:
```tsx
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* app content */}
    </PaperProvider>
  );
};
```

## Custom Theme
```tsx
import { MD3LightTheme, configureFonts } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
    error: '#B00020',
    background: '#F6F6F6',
    surface: '#FFFFFF',
  },
  fonts: configureFonts({ config: { fontFamily: 'Roboto' } }),
  roundness: 8,
};
```

## Core Components

### Button
```tsx
import { Button } from 'react-native-paper';

<Button mode="contained" onPress={handlePress}>Submit</Button>
<Button mode="outlined" onPress={handlePress} icon="camera">Take Photo</Button>
<Button mode="text" loading={isLoading} disabled={isLoading}>Cancel</Button>
// modes: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
```

### TextInput
```tsx
import { TextInput } from 'react-native-paper';

<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  mode="outlined"          // or 'flat'
  keyboardType="email-address"
  autoCapitalize="none"
  error={!!emailError}
  right={<TextInput.Icon icon="eye" onPress={toggleVisible} />}
/>
```

### Surface & Card
```tsx
import { Surface, Card } from 'react-native-paper';

<Surface style={styles.surface} elevation={2}>
  <Text>Elevated content</Text>
</Surface>

<Card>
  <Card.Cover source={{ uri: imageUrl }} />
  <Card.Title title="Card Title" subtitle="Subtitle" />
  <Card.Content>
    <Text variant="bodyMedium">Card content</Text>
  </Card.Content>
  <Card.Actions>
    <Button onPress={handleLike}>Like</Button>
    <Button onPress={handleShare}>Share</Button>
  </Card.Actions>
</Card>
```

### Dialog
```tsx
import { Dialog, Portal, Button } from 'react-native-paper';

// Portal renders outside the component tree — always wrap dialogs in Portal
<Portal>
  <Dialog visible={visible} onDismiss={() => setVisible(false)}>
    <Dialog.Title>Confirm Delete</Dialog.Title>
    <Dialog.Content>
      <Text variant="bodyMedium">This action cannot be undone.</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={() => setVisible(false)}>Cancel</Button>
      <Button onPress={handleDelete}>Delete</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
```

### Snackbar
```tsx
import { Snackbar } from 'react-native-paper';

<Snackbar
  visible={snackbarVisible}
  onDismiss={() => setSnackbarVisible(false)}
  duration={3000}
  action={{ label: 'Undo', onPress: handleUndo }}
>
  Item deleted
</Snackbar>
```

### FAB (Floating Action Button)
```tsx
import { FAB, FAB as FABGroup } from 'react-native-paper';

<FAB icon="plus" onPress={handleAdd} style={styles.fab} />

// FAB Group (expandable)
<FAB.Group
  open={fabOpen}
  icon={fabOpen ? 'close' : 'plus'}
  actions={[
    { icon: 'camera', label: 'Photo', onPress: handleCamera },
    { icon: 'pencil', label: 'Note', onPress: handleNote },
  ]}
  onStateChange={({ open }) => setFabOpen(open)}
/>
```

### Appbar (Top Navigation Bar)
```tsx
import { Appbar } from 'react-native-paper';

<Appbar.Header>
  <Appbar.BackAction onPress={navigation.goBack} />
  <Appbar.Content title="Screen Title" />
  <Appbar.Action icon="magnify" onPress={handleSearch} />
  <Appbar.Action icon="dots-vertical" onPress={handleMenu} />
</Appbar.Header>
```

### Chip
```tsx
import { Chip } from 'react-native-paper';

<Chip icon="tag" onPress={handlePress} selected={isSelected} mode="outlined">
  React Native
</Chip>
```

### List
```tsx
import { List } from 'react-native-paper';

<List.Section>
  <List.Subheader>Settings</List.Subheader>
  <List.Item
    title="Notifications"
    description="Manage notification preferences"
    left={(props) => <List.Icon {...props} icon="bell" />}
    right={(props) => <List.Icon {...props} icon="chevron-right" />}
    onPress={handleNotifications}
  />
</List.Section>

// Accordion
<List.Accordion title="Advanced Options" left={(props) => <List.Icon {...props} icon="cog" />}>
  <List.Item title="Option 1" />
  <List.Item title="Option 2" />
</List.Accordion>
```

## Typography (MD3 Variants)
```tsx
import { Text } from 'react-native-paper';

// variants: displayLarge, displayMedium, displaySmall,
//           headlineLarge, headlineMedium, headlineSmall,
//           titleLarge, titleMedium, titleSmall,
//           bodyLarge, bodyMedium, bodySmall,
//           labelLarge, labelMedium, labelSmall

<Text variant="headlineMedium">Page Title</Text>
<Text variant="bodyLarge">Body content</Text>
<Text variant="labelSmall">Caption text</Text>
```

## useTheme Hook
```tsx
import { useTheme } from 'react-native-paper';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.primary }}>Themed text</Text>
    </View>
  );
};
```

## Rules
- Always wrap the app with `<PaperProvider>` — components won't theme correctly without it
- Use `<Portal>` for Dialogs, Modals, Snackbars — they need to render above everything
- Don't mix Paper's `Text` with RN's `Text` — use Paper's `Text` for consistent theming
- Paper v5 targets Material Design 3 — use `MD3LightTheme` / `MD3DarkTheme` (not MD2)
- For custom screens without Paper components, use `theme.colors.*` for color consistency
