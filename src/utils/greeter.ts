/**
 * This function takes a name as input and returns a greeting message.
 *
 * @param name - The name of the person to greet
 * @returns A greeting message for the person
 *
 * @example
 * ```typescript
 * import { greet } from './utils/greeter';
 * console.log(greet('Alice')); // Output: Hello, Alice! Welcome to TypeScript with ESNext modules!
 * ```
 */
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to TypeScript with ESNext modules!`;
}
