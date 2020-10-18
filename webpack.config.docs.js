const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        index: [
            path.resolve(__dirname, './docgen/index.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: '/',
        filename: 'index.js'
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
    }
};
