var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngtools = require('@ngtools/webpack');

// Webpack Config
var webpackConfig = {
  // context: path.join(__dirname + '/src'),


  target: 'node',
  entry: path.join(__dirname + '/src/server.ts'),



  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig.server.json',
      skipCodeGeneration: false,
      entryModule: path.join(__dirname + '/src/app/app.node.module#AppNodeModule')


    }),
    new webpack.DefinePlugin({
      'process.env.production': true
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname + '/src/index.html'),
      inject: true, baseScript: `<script>
                      var API_URL = 'letojs.com'
                  </script>`
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

  ],

  module: {
    loaders: [

      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader', exclude: [path.join(__dirname, './src/index.html')] },
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: [path.join(__dirname, './src/electron.ts')]
      }
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
    path: path.resolve(__dirname, './dist/server'),
    libraryTarget: 'commonjs2',
    filename: 'server.js',

  },
    node: {
      global: false,
      __dirname: false,
      __filename: false,
      process: false,
      Buffer: false,
      clearImmediate: false,
      setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
