import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import pkg from './package.json';

const external = ['../../src/templates/abbreviations.json', '../../src/templates/aliases.json', '../../src/templates/country-names.json', '../../src/templates/country-to-lang.json', '../../src/templates/county-codes.json', '../../src/templates/state-codes.json', '../../src/templates/templates.json'];
export default [
  {
    input: 'src/index.js',
    output: {
      name: 'addressFormatter',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      exports: 'default'
    },
    external,
    plugins: [
      json({
        compact:true
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      }),
      terser(),
      alias({
        entries: [
          { find:/^.\/templates\/(.*)\.json/, replacement: '../../src/templates/$1.json' }
        ]
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
    external,
    plugins: [
      json({
        compact:true
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      }),
      alias({
        entries: [
          { find:/^.\/templates\/(.*)\.json/, replacement: '../../src/templates/$1.json' }
        ]
      })
    ],
  },
];
