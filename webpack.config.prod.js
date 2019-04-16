const util = require('util');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        visit: [
            path.resolve(__dirname, 'src/visit.jsx')
        ],
        admin: [
            path.resolve(__dirname, 'src/admin.jsx')
        ],
        visitDelete: [
            path.resolve(__dirname, 'src/visitDelete.jsx')
        ],
        visitUnsubscribe: [
            path.resolve(__dirname, 'src/visitUnsubscribe.jsx')
        ],
        visitConfirm: [
            path.resolve(__dirname, 'src/visitConfirm.jsx')
        ],
        visitAdmin: [
            path.resolve(__dirname, 'src/visitAdmin.jsx')
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
        ],
        alias: {
            root: path.resolve(__dirname, 'src'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            admin: path.resolve(__dirname, 'src/admin'),
            visit: path.resolve(__dirname, 'src/visit')
        }
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
    }
};
