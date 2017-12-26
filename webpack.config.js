var webpack = require('webpack');
const path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var plugins = [],
    outputFile;

var library = "tree-data-util"

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({minimize: true}));
    outputFile = library + '.js';
} else {
    outputFile = library + '.js';
}

var config = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: outputFile,
        path: path.resolve(__dirname, 'dist'),
        library: library,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: plugins
};

module.exports = config;