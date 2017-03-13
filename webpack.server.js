var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    new ExtractTextPlugin("styles.[chunkhash].css"),

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
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  },
  // externals: includeClientPackages(
  //   /@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  // ),


  //   node: {
  //     global: true,
  //     crypto: 'empty',
  //     __dirname: true,
  //     __filename: true,
  //     process: true,
  //     Buffer: false,
  //     clearImmediate: false,
  //     setImmediate: false
  //   }
};

function includeClientPackages(packages, localModule) {
  return function (context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }
    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }
    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }
    return cb();
  };
}

module.exports = webpackMerge(defaultConfig, webpackConfig);
