const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        tinput: [
            path.resolve(__dirname, './src/index.js')
        ],
        examples: [
            path.resolve(__dirname, './src/examples.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
        	path.resolve(__dirname, 'src'),
        	path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            tinput: path.resolve(__dirname, 'src'),
            examples: path.resolve(__dirname, 'src/examples')
        }
    },
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            },
            exclude: [/node_modules/, /build/]
        }]
    },
    externals: {
        'react': 'commonjs react'
    }
};
