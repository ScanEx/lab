import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-porter';
// import cpy from 'rollup-plugin-cpy';

export default [
    {
        input: 'src/index.js',        
        output: { 
            file: 'public/main.js',
            format: 'iife',
            sourcemap: true,
            name: 'RAIDEN',
            globals: {
                'leaflet': 'L',
            },         
        },
        plugins: [                      
            resolve({
                preferBuiltins: false,
                customResolveOptions: {
                    moduleDirectory: ['node_modules', 'src']
                },
            }),
            commonjs(),        
            css({dest: 'public/main.css', minified: false}),            
            babel({                
                extensions: ['.js', '.mjs'],
                exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
                include: ['example/**', 'src/**']
            }),
        ],
    },         
];