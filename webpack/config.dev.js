var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, '..', 'src')
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.eot|\.svg$|\.woff2?$|\.ttf$|\.json$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
