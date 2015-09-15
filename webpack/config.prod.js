'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');

module.exports = {
    devtool: 'surce-map',
    entry: {
        bundle: './src/index'
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/react-es6-webpack/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, '..', 'src')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(jpe?g|gif|png|eot|svg|woff2?|ttf|json|txt)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new Clean('./dist', path.join(__dirname, '..')),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
