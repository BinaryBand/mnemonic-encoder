import { blake3 } from '@noble/hashes/blake3';
import { binToByteArray } from '@/helpers/encoders';
import WORD_LIST from '@/public/word-list';

export function getChecksum(byteArray: ByteArray): number {
  return blake3(Buffer.from(byteArray))[0]! % WORD_LIST.length;
}

export function getChecksumFromBinary(binaryString: string): number {
  const byteArray: ByteArray = binToByteArray(binaryString);
  return getChecksum(byteArray);
}
