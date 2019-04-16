const util = require('util');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:9000',
            path.resolve(__dirname, 'src/index.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: '/',
        filename: 'js/[name].js'
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
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['url-loader?limit: 10000']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=public/dist/fonts/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public/dist'),
        publicPath: '/',
        port: 9000,
        host: '0.0.0.0',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: {
            rewrites: [
                {from: /\/index/, to: '/index.html'}
            ]
        },
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:80',
            changeOrigin: true,
            secure: false,
            bypass: function(req, res, proxyOptions) {
                for (let s of this.context) {
                    if (req.url.indexOf(s) == 0) {
                        console.log('Proxy ' + req.url + ' to ' + this.target);
                    }
                }
            }
        }]
    }
}
