export function asciiToByteArray(asciiString: string): ByteArray {
  const asciiBuffer: Buffer = Buffer.from(asciiString, 'ascii');
  return Array.from(asciiBuffer);
}

export function binToByteArray(binString: string): ByteArray {
  const byteArray: ByteArray = [];
  for (let i: number = 0; i < binString.length; i += 8) {
    const byte: number = parseInt(binString.slice(i, i + 8), 2);
    byteArray.push(byte);
  }
  return byteArray;
}

export function byteArrayToAscii(byteArray: ByteArray): string {
  return Buffer.from(byteArray).toString('ascii');
}

export function byteArrayToBin(byteArray: ByteArray): string {
  return byteArray.map((byte: number) => byte.toString(2).padStart(8, '0')).join('');
}
