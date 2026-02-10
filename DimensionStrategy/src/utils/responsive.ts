import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

const scale = SCREEN_WIDTH / guidelineBaseWidth;

/**
 * Determines if the device is a tablet based on screen dimensions.
 * Using a simple heuristic: if the smallest dimension is >= 600, it's likely a tablet.
 */
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }

  return (
    (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)) ||
    (pixelDensity > 2 && (adjustedWidth >= 2000 || adjustedHeight >= 2000)) ||
    SCREEN_WIDTH >= 600 ||
    SCREEN_HEIGHT >= 600
  ); // fallback loose check
};

// Also export a cached boolean if we don't expect orientation changes to change "device type"
// But for responsive layouts that might depend on rotation, usually calling a function or using a hook is better.
// Here we just export a constant assuming the device type doesn't change.
export const isTabletDevice =
  SCREEN_WIDTH >= 600 && SCREEN_HEIGHT >= 600
    ? true
    : SCREEN_WIDTH >= 600 || SCREEN_HEIGHT >= 600; // Simple check: smallest dimension >= 600 typically means tablet.

/**
 * Scales a size based on the screen's width.
 * Useful for width, marginHorizontal, paddingHorizontal, etc.
 * @param size - The size to scale
 * @returns The scaled size
 */
export function horizontalScale(size: number) {
  return (SCREEN_WIDTH / guidelineBaseWidth) * size;
}

/**
 * Scales a size based on the screen's height.
 * Useful for height, marginVertical, paddingVertical, etc.
 * @param size - The size to scale
 * @returns The scaled size
 */
export function verticalScale(size: number) {
  return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
}

/**
 * Scales a size based on the screen's width, but with a moderation factor.
 * Useful for padding, margin, etc. where you don't want the scaling to be too aggressive.
 * @param size - The size to scale
 * @param factor - The moderation factor (default 0.5). 0 = no scaling, 1 = full scaling.
 * @returns The scaled size
 */
export function moderateScale(size: number, factor = 0.5) {
  return size + (horizontalScale(size) - size) * factor;
}

/**
 * Normalizes a size based on the screen's pixel density and width.
 * Useful for font sizes to ensure they look consistent across devices.
 * @param size - The size to normalize
 * @returns The normalized size
 */
export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // For Android, we subtract 2 to adjust for density differences
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
