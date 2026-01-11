import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// All TypeScript interfaces extending TurboModule must be called 'Spec'
export interface Spec extends TurboModule {
  multiply(a: number, b: number): number; // sync method
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeMath');
