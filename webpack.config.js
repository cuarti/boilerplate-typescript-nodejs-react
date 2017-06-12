'use strict';

const {resolve} = require('path');
const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');


module.exports = {

    devtool: 'source-map',

    context: resolve(__dirname, 'app', 'client'),

    entry: [
        'webpack-hot-middleware/client',
        './index.tsx'
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname),
        publicPath: '/'
    },
    
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules'],
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:3]', 'sass-loader']
            },
        ],
    },

    plugins: [
        new CheckerPlugin(),
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        // new require('webpack').NoErrorsPlugin()
    ],

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'public'),
        publicPath: '/'
    }
    
};
