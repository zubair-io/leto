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
const ngtools = require('@ngtools/webpack');
const path = require('path');
const buildTime = Date.now() + ' ' + new Date()
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const METADATA = {
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.aot.ts',
    'main': './src/main.aot.ts',
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
  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: path.join(__dirname, 'src/app/app.module') + '#AppModule',
    }),
        new UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true },
        comments: false
    }),
    
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'SIMPLE',
        warningLevel: 'QUIET'
      },
    }),
    
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new WebpackMd5Hash(),
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
     new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join( __dirname, '/src/') // location of your src
    ),
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' ,  exclude: [path.join(__dirname, './src/index.html')]},
      { test: /\.ts$/, loaders:['babel', '@ngtools/webpack'], exclude:/\node.ts$/}
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};