/**
 * @file Constants for the Code Explainer screen.
 * Provides sample code snippets and helpful tips for using the feature.
 */

/**
 * A sample JavaScript function (debounce) used for demonstration.
 */
export const SAMPLE_CODE = `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`;

/**
 * List of tips displayed when the explanation area is empty.
 * Helps users understand the capabilities and privacy of the tool.
 */
export const TIPS = [
  'Works with any language — JS, Python, Go, Rust, SQL…',
  'Paste a full function or a class method',
  'Ask about algorithms, patterns, or potential bugs',
  'Runs 100% offline — your code never leaves the device',
];
