var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin  = require('script-ext-html-webpack-plugin')
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ClosureCompilerPlugin = require('closure-compiler-webpack-plugin');

var buildTime = Date.now() + ' ' + new Date() 
var path = require('path');
const METADATA = {
};


// Our Webpack Defaults
var webpackConfig = {
  metadata: METADATA,
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'main':       './src/main.ts',
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

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js', '.json']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
   module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader?-url'] },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] 
      },
      { test: /\.json$/, loader: 'json-loader' },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.join( __dirname, '../src/index.html')]
      },
    ]
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      showErrors:true,
      chunksSortMode: 'none',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = '/'
                  </script>`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index_uwp.html',
      inject: true,
      showErrors:true,
      chunksSortMode: 'none',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = 'http://localhost:8181/'
                  </script>`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index_electron.html',
      inject: true,
      showErrors:true,
      chunksSortMode: 'none',
      buildTime: buildTime,
      baseScript: `<script>
                      var API_URL = 'http://localhost:8181/'
                  </script>`
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    // new UglifyJsPlugin({
    //   beautify: false, 
    //   mangle: { screw_ie8 : true }, 
    //   compress: { screw_ie8: true }, 
    //   comments: false 
    // }),

    
  ],
};

module.exports =  webpackConfig;
