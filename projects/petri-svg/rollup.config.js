import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete'

export default [
    {
        input: './src/lib/index.ts',
        output: [{
            file: '../../dist/petri-svg/petri.svg.esm.js',
            format: 'esm',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: './tsconfig.lib.esm.json'
            }),
            terser()
        ]
    },
    {
        input: './src/lib/index.ts',
        output: [{
            file: '../../dist/petri-svg/petri.svg.js',
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: './tsconfig.lib.json'
            }),
            terser()
        ]
    },
    {
        input: '../../dist/petri-svg/dts/index.d.ts',
        output: [{
            file: '../../dist/petri-svg/petri.svg.d.ts',
            format: 'es'
        }],
        plugins: [
            dts(),
            del({
                targets: '../../dist/petri-svg/dts',
                hook: 'buildEnd',
                force: true
            })
        ]
    }
]
