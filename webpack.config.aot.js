const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ngtools = require('@ngtools/webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");


const config = {
    context: path.join(__dirname + '/src'),
    entry: {
        'polyfills': './polyfills.ts',
        'vendor': './vendor.ts',
        'main': './main.ts'
    },

    // enable loading modules relatively
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [__dirname + "/src", "node_modules"]
    },

    module: {


        loaders: [
            { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loader: 'raw-loader', exclude: [path.join(__dirname, './src/index.html')] },
            { test: /\.ts$/, loaders: ['babel', '@ngtools/webpack'], exclude: /\node.ts$/ }

        ]
    },


    plugins: [
        // new CompressionPlugin({
        //     asset: "[file]",
        //     algorithm: "zopfli",
        //     // test: /\.js$|\.html$/,
        //     test: /\.js$|\.css$/,
        //     threshold: 0,
        //     minRatio: 0.8
        // }),
        new ExtractTextPlugin("styles.[chunkhash].css"),
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: path.join(__dirname, 'src/app/app.module') + '#AppModule',
            baseDir: root('src'),
            typeChecking: false,

        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: scssIncludes
                },
                context: __dirname
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src')

        ),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname + '/src/index.html'),
        //     inject: true,
        //     chunksSortMode: 'dependency'
        // }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname + '/src/index.html'),
            inject: true,
            showErrors: true,
            chunksSortMode: 'dependency',
            buildTime: buildTime,
            baseScript: `<script>
                      var API_URL = '/'
                  </script>`
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname + '/src/index.html'),
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
            template: path.join(__dirname + '/src/index.html'),
            filename: 'index_electron.html',
            inject: true,
            showErrors: true,
            chunksSortMode: 'dependency',
            buildTime: buildTime,
            baseScript: `<script>
                      var API_URL = 'letojs.com'
                  </script>`
        }),

        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'

        }]),
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
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),

    ],
    output: {
        path: path.join(__dirname, "dist/www"),
        filename: "[name].[chunkhash].bundle.js",
        chunkFilename: "[id].[chunkhash].bundle.js",

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
