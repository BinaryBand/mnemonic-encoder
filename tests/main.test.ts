import { asciiToMnemonic, mnemonicToAscii } from '@/mnemonic';

function getRandomAsciiChar(): string {
  const code = Math.floor(Math.random() * 95) + 32; // ASCII range from 32 to 126
  return String.fromCharCode(code);
}

export function getRandomAsciiString(length?: number): string {
  length ??= Math.floor(Math.random() * 32) + 1;

  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    chars.push(getRandomAsciiChar());
  }
  return chars.join('');
}

describe('round trip testing', () => {
  test('ASCII to Mnemonic to ASCII', () => {
    for (let i: number = 0; i < 100; i++) {
      const randomAsciiString: string = getRandomAsciiString();
      const mnemonic: string = asciiToMnemonic(randomAsciiString);

      const asciiString: string = mnemonicToAscii(mnemonic);
      expect(asciiString).toBe(randomAsciiString);
    }
  });

  test('Mnemonic to ASCII to Mnemonic', () => {
    for (let i: number = 0; i < 100; i++) {
      const randomAsciiString: string = getRandomAsciiString();
      const mnemonic: string = asciiToMnemonic(randomAsciiString);

      const newMnemonic: string = asciiToMnemonic(mnemonicToAscii(mnemonic));
      expect(newMnemonic).toBe(mnemonic);
    }
  });
});
