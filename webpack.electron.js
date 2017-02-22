var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var webpackConfig = {
    context: path.join(__dirname + '/src'),

    target: 'electron',
    entry: './electron',


    plugins: [

      
    ],

    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.json$/, loader: 'raw-loader' }
        ]
    }
};

// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',


    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    output: {
        path: path.resolve(__dirname, './dist/electron'),
        libraryTarget: 'commonjs2',
        filename: 'electron.js',

    },
    node: {
        global: true,
        crypto: true,
        __dirname: false,
        __filename: false,
        process: true,
        Buffer: true
    },



};

module.exports = webpackMerge(defaultConfig, webpackConfig);
