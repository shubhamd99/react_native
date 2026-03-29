import Foundation
import NitroModules

/**
 * UserModule implementation in Swift.
 * Handles complex objects, enums, and arrays with Nitro.
 */
class UserModule: HybridUserModuleSpec {
  // Simple in-memory storage on the native side
  private var users: [String: User] = [:]

  func registerUser(user: User) throws {
    users[user.id] = user
    print("Native [Swift]: Registered user \(user.name) with role \(user.role)")
  }

  func getUserById(id: String) throws -> User? {
    return users[id]
  }

  func getUsersByRole(role: UserRole) throws -> [User] {
    // Filter the users map by role and return as an array
    return users.values.filter { $0.role == role }
  }

  func fetchRemoteUser(id: String) throws -> Promise<User> {
    return Promise { resolve in
      // Simulate network delay
      DispatchQueue.global().asyncAfter(deadline: .now() + 1.2) {
        let remoteUser = User(
          id: id, 
          name: "Fetch \(id)", 
          age: 30, 
          role: .admin, 
          tags: ["fetched", "remote", "nitro"]
        )
        resolve(remoteUser)
      }
    }
  }

  func clearAll() throws {
    users.removeAll()
    print("Native [Swift]: Cleared all users")
  }
}
