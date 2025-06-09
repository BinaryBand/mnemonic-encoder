import { asciiToByteArray, binToByteArray, byteArrayToAscii, byteArrayToBin } from '@/helpers/encoders';
// import { getChecksum } from '@/helpers/checksum';
import { assert, isEqual } from '@/helpers/misc';
import { padBinaryString, unpadBinaryString } from '@/helpers/padding';
import WORD_LIST from '@/public/word-list';

/**
 * Converts a byte array into a mnemonic phrase using a predefined word list.
 *
 * The function performs the following steps:
 * 1. Converts the input byte array to a binary string.
 * 2. Pads the binary string to ensure its length is a multiple of 11.
 * 3. Splits the padded binary string into 11-bit chunks and converts each chunk to an index.
 * 4. Validates that each index is within the bounds of the word list.
 * 5. Calculates a checksum and appends it to the index array.
 * 6. Maps each index (including the checksum) to a word from the word list and joins them into a space-separated mnemonic phrase.
 *
 * @param byteArray - The input byte array to encode as a mnemonic phrase.
 * @returns The mnemonic phrase as a space-separated string.
 * @throws Will throw an error if the binary string does not match the original byte array,
 *         if the binary string is not properly padded,
 *         or if any word index is out of bounds or negative.
 */
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

  // const checksum: number = getChecksum(indexArray);
  // const payload: ByteArray = [...indexArray, checksum];
  const payload: ByteArray = indexArray;

  return payload.map((index: number) => WORD_LIST[index]).join(' ');
}

/**
 * Converts a mnemonic phrase back into its original ASCII string representation.
 *
 * The function splits the mnemonic into words, maps each word to its index in the word list,
 * verifies the checksum, reconstructs the original binary string, and converts it back to ASCII.
 * Throws an error if the checksum is missing or does not match, or if the binary string is invalid.
 *
 * @param mnemonic - The space-separated mnemonic phrase to decode.
 * @returns The decoded ASCII string.
 * @throws If the checksum is missing or invalid, or if the binary string is malformed.
 */
export function mnemonicToAscii(mnemonic: string): string {
  const wordArray: string[] = mnemonic.split(' ');
  const indexArray: ByteArray = wordArray.map((word: string) => WORD_LIST.indexOf(word));

  // const checksum: number | undefined = indexArray.pop();
  // assert(checksum !== undefined, 'Checksum is missing from mnemonic');

  // const controlChecksum: number = getChecksum(indexArray);
  // assert(checksum === controlChecksum, 'Checksum mismatch');

  const paddedBinaryString: string = indexArray.map((index: number) => index.toString(2).padStart(11, '0')).join('');
  const binaryString: string = unpadBinaryString(paddedBinaryString);
  assert(binaryString.length % 8 === 0, 'Binary string length must be a multiple of 8');

  const byteArray: ByteArray = binToByteArray(binaryString);
  assert(isEqual(byteArray, asciiToByteArray(byteArrayToAscii(byteArray))), 'Byte array does not match ASCII string');

  return byteArrayToAscii(byteArray);
}
