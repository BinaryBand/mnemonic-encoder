import { blake3 } from '@noble/hashes/blake3';
// import { binToByteArray } from '@/helpers/encoders';
// import WORD_LIST from '@/public/word-list';

export function getChecksum(binaryString: string): string {
  const buffer = Buffer.from(binaryString, 'binary');
  const hash = blake3(buffer);
  return (hash[0]! & 0xff).toString(2).padStart(8, '0'); // Return the first byte masked to 8 bits
}

// export function getChecksumFromBinary(binaryString: string): number {
//   const byteArray: ByteArray = binToByteArray(binaryString);
//   return getChecksum(byteArray);
// }
