# Dimension Strategy Project

This project demonstrates a strategy for handling responsive dimensions in React Native apps, including scaling for different screen sizes and pixel densities.

## Features

- **Horizontal Scaling**: Scales dimensions based on screen width.
- **Vertical Scaling**: Scales dimensions based on screen height.
- **Moderate Scaling**: Scales dimensions with a moderation factor (useful for padding/margin).
- **Font Normalization**: Scales font sizes based on pixel density and screen width.

## Usage

The core logic is located in `src/utils/responsive.ts`.

### Importing

```typescript
import {
  horizontalScale,
  verticalScale,
  moderateScale,
  normalize,
} from './src/utils/responsive';
```

### Examples

#### Scaling Width and Margin

```typescript
const styles = StyleSheet.create({
  container: {
    width: horizontalScale(300), // Scales based on width
    marginHorizontal: horizontalScale(20),
  },
});
```

#### Scaling Height and Vertical Padding

```typescript
const styles = StyleSheet.create({
  box: {
    height: verticalScale(200), // Scales based on height
    paddingVertical: verticalScale(10),
  },
});
```

#### Moderate Scaling (Padding/Margin)

Use `moderateScale` when you want some scaling but don't want it to be linear with the screen size (e.g., to prevent elements from becoming too large on tablets or too small on small phones).

```typescript
const styles = StyleSheet.create({
  button: {
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
  },
});
```

#### Font Normalization

Use `normalize` for font sizes to ensure readability across devices.

```typescript
const styles = StyleSheet.create({
  text: {
    fontSize: normalize(16),
  },
});
```

#### Tablet Support

You can checking if the device is a tablet using `isTablet()` or `isTabletDevice`.

```typescript
import { isTabletDevice } from './src/utils/responsive';

const styles = StyleSheet.create({
  container: {
    flexDirection: isTabletDevice ? 'row' : 'column',
  },
});
```

Check out `src/components/ComplexResponsiveLayout.tsx` for a complete example of a grid layout that adapts columns based on the device type.

#### Hairline Width

For borders that should be as thin as possible (1 physical pixel), use `StyleSheet.hairlineWidth`.

```typescript
const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cccccc',
  },
});
```

This ensures the line is crisp on all devices, regardless of pixel density.

#### Aspect Ratio

Use `aspectRatio` to maintain specific proportions (e.g., for images or video containers) regardless of the screen size.

```typescript
const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 16 / 9, // Height will be calculated automatically
  },
});
```

## Running the Demo

1.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

2.  Run the app:
    ```bash
    npm run android
    # or
    npm run ios
    ```

## Project Structure

- `src/utils/responsive.ts`: Contains the improved scaling functions.
- `src/components/ResponsiveBox.tsx`: Demo component for box dimensions.
- `src/components/ResponsiveText.tsx`: Demo component for text sizing.
- `App.tsx`: Main entry point displaying the demo components.
