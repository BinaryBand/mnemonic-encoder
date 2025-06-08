import { blake3 } from '@noble/hashes/blake3';
import { binToByteArray } from '@/helpers/encoders';
import WORD_LIST from '@public/word-list.json';

export function getChecksum(byteArray: ByteArray): number {
  const controlChecksum: number = blake3(Buffer.from(byteArray))[0]! % WORD_LIST.length;
  return controlChecksum;
}

export function getChecksumFromBinary(binaryString: string): number {
  const byteArray: ByteArray = binToByteArray(binaryString);
  return getChecksum(byteArray);
}
