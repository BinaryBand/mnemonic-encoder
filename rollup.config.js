import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'esm',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    json(),
    typescript({}),
    typescriptPaths(),
    nodeResolve({ preferBuiltins: true }),
    terser({ format: { comments: false } }),
    commonjs(),
  ],
};
