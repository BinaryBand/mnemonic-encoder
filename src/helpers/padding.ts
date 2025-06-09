import { assert } from '@/helpers/misc';
import { getChecksum } from '@/helpers/checksum';

export function padBinaryString(binaryString: string): string {
  assert(binaryString.length % 8 === 0, 'Binary string length must be a multiple of 8');

  const checksum: string = getChecksum(binaryString);
  assert(checksum.length === 5, 'Checksum must be 5 bits long');

  const originalLength: number = binaryString.length / 8;
  const encodedLength: string = originalLength.toString(2).padStart(6, '0');
  assert(encodedLength.length === 6, 'Encoded length must be 6 bits long');
  binaryString += encodedLength;
  binaryString += checksum;

  const paddingLength: number = (11 - (binaryString.length % 11)) % 11;
  const padding: string = '0'.repeat(paddingLength);
  return padding + binaryString;
}

export function unpadBinaryString(paddedBinaryString: string): string {
  assert(paddedBinaryString.length % 11 === 0, 'Padded binary string length must be a multiple of 11');

  const encodedLength: string = paddedBinaryString.slice(-11, -5);
  assert(encodedLength.length === 6, 'Encoded length must be 6 bits long');

  const originalLength: number = parseInt(encodedLength, 2);
  const start: number = paddedBinaryString.length - 11 - originalLength * 8;
  const unpaddedBinaryString: string = paddedBinaryString.slice(start, -11);
  assert(unpaddedBinaryString.length % 8 === 0, 'Unpadded binary string length must be a multiple of 8');

  const checksum: string = getChecksum(unpaddedBinaryString);
  assert(checksum === paddedBinaryString.slice(-5), 'Checksum does not match');

  return unpaddedBinaryString;
}
