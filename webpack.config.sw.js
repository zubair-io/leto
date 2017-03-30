const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ngtools = require('@ngtools/webpack');
const CompressionPlugin = require("compression-webpack-plugin");
//const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const buildTime = Date.now()
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AngularServiceWorkerPlugin = require('@angular/service-worker/webpack').default;
const config = {
    context: path.join(__dirname + '/src'),
    entry: {
      
        'sw': './sw.ts'
    },

    // enable loading modules relatively
    resolve: {
        extensions: ['.ts', '.js'],
        //   modules: [__dirname + "/src", "node_modules"]
    },

    module: {


        loaders: [
            { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loader: 'raw-loader', exclude: [path.join(__dirname, './src/index.html')] },
                       { test: /\.ts$/, loaders: ['@ngtools/webpack'], exclude: /\node.ts$/ },



        ]
    },


    plugins: [
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: path.join(__dirname, 'src/app/app.module') + '#AppModule',
            baseDir: root('src'),
            typeChecking: false,

        }),
          new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src')

        ),
        // new ClosureCompiler({
        //     options: {
        //         languageIn: 'ECMASCRIPT6',
        //         languageOut: 'ECMASCRIPT5',
        //         compilationLevel: 'SIMPLE',
        //         warningLevel: 'QUIET'
        //     },
        // }),
        //  new ClosureCompilerPlugin({
        //   compiler: {
        //     language_in: 'ECMASCRIPT6',
        //     language_out: 'ECMASCRIPT5',
        //     compilation_level: 'ADVANCED'
        //   },
        //   concurrency: 3,
        // }),
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, 'src/sw.js'),
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),

      
    ],
    output: {
        path: path.join(__dirname, "dist/www"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",

    },

    devServer: {
        historyApiFallback: true,
        port: 3535,
        contentBase: './src',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}



module.exports = config;
