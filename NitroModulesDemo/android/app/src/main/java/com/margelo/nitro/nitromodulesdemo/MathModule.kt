package com.margelo.nitro.nitromodulesdemo

import com.margelo.nitro.core.Promise
import kotlinx.coroutines.delay

/**
 * MathModule implementation in Kotlin.
 * This class inherits from the generated `HybridMathModuleSpec` abstract class.
 */
class MathModule : HybridMathModuleSpec() {
  // Synchronous methods
  override fun add(a: Double, b: Double): Double {
    return a + b
  }

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  // Asynchronous method
  override fun doAsyncWork(): Promise<String> {
    return Promise.async {
      // Simulate some asynchronous work with coroutines
      delay(1500)
      "Async work completed successfully from Kotlin!"
    }
  }

  // Getter method
  override fun getNativeValue(): String {
    return "Value from Kotlin"
  }
}
