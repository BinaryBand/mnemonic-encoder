import { asciiToByteArray, binToByteArray, byteArrayToAscii, byteArrayToBin } from '@/helpers/encoders';
import { getChecksum } from '@/helpers/checksum';
import { assert, isEqual } from '@/helpers/misc';
import { padBinaryString, unpadBinaryString } from '@/helpers/padding';
import WORD_LIST from '@/public/word-list';

export function byteArrayToMnemonic(byteArray: ByteArray): string {
  const binaryString: string = byteArrayToBin(byteArray);
  assert(isEqual(binToByteArray(binaryString), byteArray), 'Binary string does not match original byte array');

  const paddedBinaryString: string = padBinaryString(binaryString);
  assert(paddedBinaryString.length % 11 === 0, 'Not properly padded');
  assert(unpadBinaryString(paddedBinaryString) === binaryString);

  const binaryChunks: string[] = paddedBinaryString.match(/.{1,11}/g) || [];
  const indexArray: ByteArray = binaryChunks.map((chunk: string) => parseInt(chunk, 2));
  assert(!indexArray.every((i) => i >= WORD_LIST.length), 'Word index out of bounds');
  assert(!indexArray.every((i) => i < 0), 'Word index is negative');

  const checksum: number = getChecksum(indexArray);
  const payload: ByteArray = [...indexArray, checksum];

  return payload.map((index: number) => WORD_LIST[index]).join(' ');
}

export function mnemonicToAscii(mnemonic: string): string {
  const wordArray: string[] = mnemonic.split(' ');
  const indexArray: ByteArray = wordArray.map((word: string) => WORD_LIST.indexOf(word));

  const checksum: number | undefined = indexArray.pop();
  assert(checksum !== undefined, 'Checksum is missing from mnemonic');

  const controlChecksum: number = getChecksum(indexArray);
  assert(checksum === controlChecksum, 'Checksum mismatch');

  const paddedBinaryString: string = indexArray.map((index: number) => index.toString(2).padStart(11, '0')).join('');
  const binaryString: string = unpadBinaryString(paddedBinaryString);
  assert(binaryString.length % 8 === 0, 'Binary string length must be a multiple of 8');

  const byteArray: ByteArray = binToByteArray(binaryString);
  assert(isEqual(byteArray, asciiToByteArray(byteArrayToAscii(byteArray))), 'Byte array does not match ASCII string');

  return byteArrayToAscii(byteArray);
}
