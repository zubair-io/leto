'use strict'
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const BabiliPlugin = require("babili-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const buildTime = Date.now() + ' ' + new Date()
const path = require('path');
const METADATA = {
};

module.exports = {
  entry: {
    'polyfills': './tmp/es6/polyfills.js',
    'vendor': './tmp/es6/vendor.aot.js',
    'main': './tmp/es6/main.aot.js',
  },
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    path: './dist/www',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
         // presets: ['latest']
        }
      },
      // {
      //   test: /\.ts$/,
      //   loader: 'ts',
      //   query: {
      // 				tsconfig: 'tsconfig.webpack.json'
      // 			}

      // },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.join(__dirname, './src/index.html')]
      },
      //     {
      //   test: /\.json$/,
      //   loader: "json-loader"
      // }
    ]
  },

  resolve: {
    root: [path.join(__dirname, 'app')],
    extensions: ['', '.ts', '.js']
  },





  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new WebpackMd5Hash(),
    // new DedupePlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    new BabiliPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      showErrors: true,
      chunksSortMode: 'dependency',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = '/'
                  </script>`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index_uwp.html',
      inject: true,
      showErrors: true,
      chunksSortMode: 'dependency',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = 'letojs.com'
                  </script>`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index_electron.html',
      inject: true,
      showErrors: true,
      chunksSortMode: 'dependency',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = 'letojs.com'
                  </script>`
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
     new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),


    // new ClosureCompiler({
    //   options: {
    //     languageIn: 'ECMASCRIPT6',
    //     languageOut: 'ECMASCRIPT5',
    //     compilationLevel: 'SIMPLE',
    //   },
    // })
    new UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true },
        comments: false
    }),



  ],

};
