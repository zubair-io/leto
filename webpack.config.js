const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const fs = require('fs')
var privateKey = fs.readFileSync('host.key', 'utf8');
var certificate = fs.readFileSync('host.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
//const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const AngularServiceWorkerPlugin = require('@angular/service-worker/webpack').default;
console.log(AngularServiceWorkerPlugin)

// Webpack Config
var webpackConfig = {
  context: path.join(__dirname + '/src'),

  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'main': './main.ts',
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist/www'),
  },

  plugins: [
    //   new ServiceWorkerWebpackPlugin({
    //         entry: path.join(__dirname, 'src/sw.js'),
    // }),
    new webpack.DefinePlugin({
      'process.env.production': false
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname + '/src/index.html'),
      inject: false,
      baseScript: `<script>
                      var API_URL = '/'
                  </script>
                  <script src="//localhost:35729/livereload.js"></script>
`
    }),
    new CopyWebpackPlugin([{
      from: 'assets',
      to: 'assets'
    }]),
    new LiveReloadPlugin(credentials),
    new CopyWebpackPlugin([
      { from: 'ngsw-manifest.json' },
    ]),
    new AngularServiceWorkerPlugin(),
  ],

  module: {
    loaders: [

      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader', exclude: [path.join(__dirname, './src/index.html')] },
      {
        test: /\.ts$/, loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
        ], exclude: /server.ts/
      }

    ]
  }

};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    port: 3000
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
