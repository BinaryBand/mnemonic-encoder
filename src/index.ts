import { Command } from 'commander';
import { writeFileSync } from 'fs';
import { byteArrayToMnemonic, mnemonicToAscii } from '@/mnemonic';

const program: Command = new Command();

program.name('mnemonic-tool');
program.description('A tool for converting files to and from mnemonic phrases');
program.version('0.1.0');

program
  .command('encode')
  .description('Convert raw data to a mnemonic phrase and output to the console')
  .argument('<rawInput>', 'Input data to encode')
  .option('-e, --enc <type>', 'Specify the input encoding type', 'utf8')
  .option('-o, --output <file>', 'Output file to write the mnemonic phrase to (optional)', undefined)
  .action((rawInput, options) => {
    const bufferEncoding: BufferEncoding = options['enc'].toLowerCase();
    let byteArray: ByteArray = null!;
    switch (bufferEncoding) {
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
        byteArray = Array.from(Buffer.from(rawInput, bufferEncoding));
        break;
      default:
        throw new Error(`Unsupported encoding type: ${bufferEncoding}`);
    }

    const outputFile: string | undefined = options['output'];
    const mnemonic: string = byteArrayToMnemonic(byteArray);
    if (outputFile) {
      writeFileSync(outputFile, mnemonic, { encoding: 'utf8' });
      console.log(`Mnemonic written to file: ${outputFile}`);
    } else {
      console.log(`Mnemonic encoded: ${mnemonic}`);
    }
  });

program
  .command('decode <input>')
  .description('Convert a mnemonic phrase to a raw ASCII string and output to the console')
  .action((input) => {
    const asciiString: string = mnemonicToAscii(input);
    console.log(`ASCII decoded: ${asciiString}`);
  });

program.parse(process.argv);
