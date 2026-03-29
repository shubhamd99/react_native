import { type HybridObject } from 'react-native-nitro-modules'

/**
 * A sample Nitro Hybrid Object to demonstrate Nitro's power.
 * It provides high-performance, synchronous, and asynchronous operations.
 */
export interface MathModule extends HybridObject<{ ios: 'swift', android: 'kotlin' }> {
  /**
   * Adds two numbers synchronously.
   * Nitro uses JSI to call this method with zero serialization overhead.
   */
  add(a: number, b: number): number

  /**
   * Multiplies two numbers synchronously.
   */
  multiply(a: number, b: number): number

  /**
   * A sample asynchronous operation.
   * Returns a Promise that resolves to a string.
   */
  doAsyncWork(): Promise<string>

  /**
   * Gets a value from the native side.
   */
  getNativeValue(): string
}
