const util = require('util');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        test: [
            'webpack-dev-server/client?http://localhost:9000',
            path.resolve(__dirname, 'test/test.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
        	path.resolve(__dirname, 'src'),
        	path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            use: ['babel-loader'],
            exclude: [/node_modules/, /build/]
        }, {
            test: /\.css|\.less$$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        port: 9000,
        host: '0.0.0.0'
    }
}
