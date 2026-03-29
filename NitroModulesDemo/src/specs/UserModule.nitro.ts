import { type HybridObject } from 'react-native-nitro-modules'

/**
 * An enum representing user roles.
 * Nitro automatically generates native enums (Swift `enum`, Kotlin `enum class`).
 *
 * NOTE: C++ enums must use numbers. If you need string values, 
 * use TypeScript unions instead.
 */
export enum UserRole {
  USER = 0,
  ADMIN = 1,
  GUEST = 2
}

/**
 * A plain object (struct) representing a User.
 * Nitro automatically generates native structs/data classes.
 */
export interface User {
  id: string
  name: string
  age: number
  role: UserRole
  tags: string[]
}

/**
 * UserModule - A more complex Nitro Hybrid Object.
 * Demonstrates passing objects, arrays, and enums between JS and Native.
 */
export interface UserModule extends HybridObject<{ ios: 'swift', android: 'kotlin' }> {
  /**
   * Register a user by passing a complex object from JS to Native.
   * Nitro handles the conversion to a native struct/data class.
   */
  registerUser(user: User): void

  /**
   * Retrieve a user from the native side.
   * Returns a complex object from Native back to JS.
   */
  getUserById(id: string): User | undefined

  /**
   * Get all users with a specific role.
   * Demonstrates filtering with enums and returning arrays of objects.
   */
  getUsersByRole(role: UserRole): User[]

  /**
   * Simulates an async fetch of a user.
   * Demonstrates Promises with complex object return types.
   */
  fetchRemoteUser(id: string): Promise<User>

  /**
   * Clear all users from memory.
   */
  clearAll(): void
}
