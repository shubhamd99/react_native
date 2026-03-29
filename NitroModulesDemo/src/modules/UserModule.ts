import { NitroModules } from 'react-native-nitro-modules'
import type { UserModule } from '../specs/UserModule.nitro'

/**
 * Access the `UserModule` Hybrid Object.
 * Using the generic <UserModule> now works because the interface extends HybridObject<{}>.
 */
export const UserModuleInstance = NitroModules.createHybridObject<UserModule>('UserModule')
