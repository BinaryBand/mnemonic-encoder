import { Command } from 'commander';
import { writeFileSync, readFileSync } from 'fs';
import { byteArrayToMnemonic, mnemonicToAscii } from '@/mnemonic';

const program: Command = new Command();

program.name('mnemonic-tool');
program.description('A tool for converting files to and from mnemonic phrases');
program.version('0.1.0');

program
  .command('encode')
  .description('Convert raw data to a mnemonic phrase and output to the console')
  .option('-e, --encoding <type>', 'Specify the input encoding type', 'utf8')
  .option('-i, --input <data>', 'Input data to encode', undefined)
  .option('-f, --file <file>', 'Specify input file to read from', undefined)
  .option('-o, --output <file>', 'Output file to write the mnemonic phrase to (optional)', undefined)
  .action((options) => {
    const rawInput: string | undefined = options['input'];
    const inputFile: string | undefined = options['file'];
    const encoding: BufferEncoding = options['encoding'].toLowerCase();

    let payload: string;
    if (inputFile) {
      payload = readFileSync(inputFile, { encoding });
    } else {
      payload = rawInput!;
    }

    let byteArray: ByteArray = null!;
    switch (encoding) {
      case 'ascii':
      case 'utf8':
      case 'utf-8':
      case 'utf16le':
      case 'utf-16le':
      case 'ucs2':
      case 'ucs-2':
      case 'base64':
      case 'base64url':
      case 'latin1':
      case 'binary':
      case 'hex':
        byteArray = Array.from(Buffer.from(payload, encoding));
        break;
      default:
        throw new Error(`Unsupported encoding type: ${encoding}`);
    }

    const outputFile: string | undefined = options['output'];
    const mnemonic: string = byteArrayToMnemonic(byteArray);
    if (outputFile) {
      writeFileSync(outputFile, mnemonic, { encoding: 'utf8' });
      console.log(outputFile);
    } else {
      console.log(mnemonic);
    }
  });

program
  .command('decode')
  .description('Convert a mnemonic phrase to a raw ASCII string and output to the console')
  .option('-i, --input <mnemonic>', 'Mnemonic phrase to decode')
  .option('-f, --file <file>', 'Specify input file to read from', undefined)
  .action((options) => {
    const input: string | undefined = options['input'];
    const inputFile: string | undefined = options['file'];

    if (inputFile) {
      const data: string = readFileSync(inputFile, { encoding: 'utf8' });
      const asciiString: string = mnemonicToAscii(data);
      console.log(asciiString);
    } else {
      const asciiString: string = mnemonicToAscii(input!);
      console.log(asciiString);
    }
  });

program.parse(process.argv);
