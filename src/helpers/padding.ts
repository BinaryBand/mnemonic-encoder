import { assert } from '@/helpers/misc';

export function padBinaryString(binaryString: string): string {
  assert(binaryString.length % 8 === 0, 'Binary string length must be a multiple of 8');

  const originalLength: number = binaryString.length / 8;
  const encodedLength: string = originalLength.toString(2).padStart(11, '0');
  binaryString += encodedLength;

  const paddingLength: number = (11 - (binaryString.length % 11)) % 11;
  const padding: string = '0'.repeat(paddingLength);
  return padding + binaryString;
}

export function unpadBinaryString(paddedBinaryString: string): string {
  assert(paddedBinaryString.length % 11 === 0, 'Padded binary string length must be a multiple of 11');

  const originalLength: number = parseInt(paddedBinaryString.slice(-11), 2);
  const start: number = paddedBinaryString.length - 11 - originalLength * 8;
  return paddedBinaryString.slice(start, -11);
}
