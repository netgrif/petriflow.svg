import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete'
import copy from "rollup-plugin-copy";

const dist = "../../dist/petri-svg"

export default [
    {
        input: './src/lib/index.ts',
        output: [{
            file: dist + '/petri.svg.esm.js',
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
            file: dist + '/petri.svg.js',
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: './tsconfig.lib.json'
            }),
            terser(),
            copy({
                targets: [
                    {src: ["./package.json", "./README.md", "../../LICENSE", "../../CHANGELOG.md"], dest: dist},
                ]
            })
        ]
    },
    {
        input: dist + '/dts/index.d.ts',
        output: [{
            file: dist + '/petri.svg.d.ts',
            format: 'es'
        }],
        plugins: [
            dts(),
            del({
                targets: dist + '/dts',
                hook: 'buildEnd',
                force: true
            })
        ]
    }
]
