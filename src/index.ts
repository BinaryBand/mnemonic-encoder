import 'dotenv/config';
import { greet } from '@/utils/greeter';

import { blake2b } from '@noble/hashes/blake2';

const message: CustomString = greet('World');
console.log(message);

console.log('Environment Variables:');
console.log('-----------------------');
console.log(`NODE_ENV: ${process.env['SUPER_SECRETIVE_SECRET']}`);

const hash: CustomString = Buffer.from(blake2b('Hello, World!', { dkLen: 32 })).toString('hex');
console.log('Hash:', hash);
