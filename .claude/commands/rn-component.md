# Generate React Native Component

Generate a production-ready React Native component following this repo's conventions.

## Instructions

When asked to create a component, scaffold it using the template below. Ask for clarification on:
- Component name
- Props it accepts
- Whether it needs local state
- Whether it uses navigation
- Styling approach (StyleSheet vs NativeWind)

## Component Template (StyleSheet)

```tsx
import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface $NAMEProps {
  // define props here
}

const $NAME = memo(({ }: $NAMEProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>$NAME</Text>
    </View>
  );
});

$NAME.displayName = '$NAME';

export default $NAME;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Component Template (NativeWind)

```tsx
import React, { memo } from 'react';
import { View, Text } from 'react-native';

interface $NAMEProps {
  // define props here
}

const $NAME = memo(({ }: $NAMEProps): React.ReactElement => {
  return (
    <View className="flex-1">
      <Text>$NAME</Text>
    </View>
  );
});

$NAME.displayName = '$NAME';

export default $NAME;
```

## Screen Template

```tsx
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, '$SCREEN_NAME'>;

const $SCREEN_NAMEScreen = ({ navigation, route }: Props): React.ReactElement => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* content */}
      </View>
    </SafeAreaView>
  );
};

export default $SCREEN_NAMEScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
```

## Custom Hook Template

```tsx
import { useState, useCallback } from 'react';

interface Use$NAMEOptions {
  // options
}

interface Use$NAMEReturn {
  // return shape
}

const use$NAME = (options?: Use$NAMEOptions): Use$NAMEReturn => {
  // implementation
  return {};
};

export default use$NAME;
```

## Rules to follow when generating components
1. Replace `$NAME` with the actual component name (PascalCase)
2. Only add `memo()` if the component is used in a list or has stable props — explain the decision
3. Place styles at the bottom of the file, after the export
4. Never use inline style objects (e.g., `style={{ flex: 1 }}`) — always use StyleSheet
5. Use `SafeAreaView` for top-level screens
6. Add `displayName` when wrapping with `memo`
7. For hooks, prefix with `use` and return a typed object (not an array unless it mirrors useState)
8. Export the component as the default export; named exports only for types
