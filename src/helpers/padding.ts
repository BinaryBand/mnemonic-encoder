import { assert } from '@/helpers/misc';
import { getChecksum } from '@/helpers/checksum';

export function padBinaryString(binaryString: string): string {
  assert(binaryString.length % 8 === 0, 'Binary string length must be a multiple of 8');

  const checksum: string = getChecksum(binaryString);
  assert(checksum.length === 8, 'Checksum must be 8 bits long');

  const originalLength: number = binaryString.length / 8;
  const encodedLength: string = originalLength.toString(2).padStart(14, '0');
  assert(encodedLength.length === 14, 'Encoded length must be 14 bits long');
  binaryString += encodedLength;
  binaryString += checksum;

  const paddingLength: number = (11 - (binaryString.length % 11)) % 11;
  const padding: string = '0'.repeat(paddingLength);
  return padding + binaryString;
}

export function unpadBinaryString(paddedBinaryString: string): string {
  assert(paddedBinaryString.length % 11 === 0, 'Padded binary string length must be a multiple of 11');

  const encodedLength: string = paddedBinaryString.slice(-22, -8);
  assert(encodedLength.length === 14, 'Encoded length must be 14 bits long');

  const originalLength: number = parseInt(encodedLength, 2);
  const start: number = paddedBinaryString.length - 22 - originalLength * 8;
  const unpaddedBinaryString: string = paddedBinaryString.slice(start, -22);
  assert(unpaddedBinaryString.length % 8 === 0, 'Unpadded binary string length must be a multiple of 8');

  const checksum: string = getChecksum(unpaddedBinaryString);
  assert(checksum === paddedBinaryString.slice(-8), 'Checksum does not match');

  return unpaddedBinaryString;
}
