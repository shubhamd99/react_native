import { NitroModules } from 'react-native-nitro-modules'
import type { MathModule } from '../specs/MathModule.nitro'

/**
 * Access the `MathModule` Hybrid Object.
 * Using the generic <MathModule> works because the interface 
 * extends HybridObject<{}>, which satisfies the constraint.
 */
export const MathModuleInstance = NitroModules.createHybridObject<MathModule>('MathModule')
