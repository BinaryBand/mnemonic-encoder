import { greet } from '@/utils/greeter';
import { constant } from '@public/constants.json';

describe('test tests', () => {
  test('test greeter', () => {
    expect(greet('World')).toBe('Hello, World! Welcome to TypeScript with ESNext modules!');
  });

  test('test constant', () => {
    expect(constant).toBe('0x00ff');
  });
});
