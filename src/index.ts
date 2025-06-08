import { Command } from 'commander';
import { asciiToMnemonic, mnemonicToAscii } from '@/mnemonic';

const program = new Command();

program.name('mnemonic-tool').description('A tool for converting files to and from mnemonic phrases').version('0.1.0');

program
  .command('encode <input>')
  .description('Convert a raw ASCII string to a mnemonic phrase and output to the console')
  .action((input) => {
    const mnemonic: string = asciiToMnemonic(input);
    console.log(`Mnemonic encoded: ${mnemonic}`);
  });

program
  .command('decode <input>')
  .description('Convert a mnemonic phrase to a raw ASCII string and output to the console')
  .action((input) => {
    const asciiString: string = mnemonicToAscii(input);
    console.log(`ASCII decoded: ${asciiString}`);
  });

program.parse(process.argv);
