// var webpack = require('webpack');
// var path = require('path')

// var server = {
//   context: path.join(__dirname, '../'),
//   resolve: {
//     // root: '/src',

//     extensions: ['', '.ts', '.js', '.json']
//   },
//   module: {
//     loaders: [
//       // TypeScript
//       {
//         test: /\.ts$/,
//         loaders: ['angular2-template-loader', 'awesome-typescript-loader?tsconfig=tsconfig.server.json'],
//       },
//       { test: /\.css$/, loader: 'raw-loader' },
//       { test: /\.json$/, loader: 'raw-loader' },
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         loaders: ['raw-loader', 'sass-loader']
//       },
//       {
//         test: /\.html$/,
//         loader: 'raw-loader',
//         exclude: [path.join(__dirname, '../src/index.html')]
//       },

//     ],
//     preLoaders: [
//       // needed to lower the filesize of angular due to inline source-maps
//       { test: /\.js$/, loader: 'source-map-loader' }
//     ],
//   },
//   plugins: [
//     new webpack.optimize.OccurrenceOrderPlugin(true)
//   ],
//   externals: checkNodeImport,

//   target: 'node',
//   entry: './src/server',
//   output: {
//     path: './dist/server',
//     libraryTarget: 'commonjs2',
//     filename: 'server.'+ Date.now() +'.js',

//   },
//   node: {
//     global: true,
//     __dirname: false,
//     __filename: true,
//     process: true,
//     Buffer: true
//   }

// };


// module.exports = server

// // Helpers
// function checkNodeImport(context, request, cb) {
//   if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
//     cb(null, 'commonjs ' + request); return;
//   }
//   cb();
// }

var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var webpackConfig = {
  context: path.join(__dirname + '/src'),

 target: 'node',
  entry: './server',



  plugins: [
    new ExtractTextPlugin("styles.[chunkhash].css"),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      path.resolve(__dirname, './src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    new HtmlWebpackPlugin({
      template: path.join(__dirname + '/src/index.html'),
      inject: true,            baseScript: `<script>
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
      { test: /\.html$/, loader: 'raw-loader' ,  exclude: [path.join(__dirname, './src/index.html')]},
      { test: /\.ts$/, loaders:[
        'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'], exclude:/\node.ts$/}
    
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
    __dirname: false,
    __filename: true,
    process: true,
    Buffer: true
  },
    externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  ),


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
  return function(context, request, cb) {
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
