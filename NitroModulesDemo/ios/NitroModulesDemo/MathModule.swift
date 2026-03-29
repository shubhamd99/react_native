import Foundation
import NitroModules

/**
 * MathModule implementation in Swift.
 * This class implements the generated `HybridMathModuleSpec` protocol.
 */
class MathModule: HybridMathModuleSpec {
  // Synchronous methods
  func add(a: Double, b: Double) throws -> Double {
    return a + b
  }

  func multiply(a: Double, b: Double) throws -> Double {
    return a * b
  }

  // Asynchronous method
  func doAsyncWork() throws -> Promise<String> {
    return Promise { resolve in
      // Simulate some background work
      DispatchQueue.global().asyncAfter(deadline: .now() + 1.5) {
        resolve("Async work completed successfully from Swift!")
      }
    }
  }

  // Getter method
  func getNativeValue() throws -> String {
    return "Value from Swift"
  }
}
