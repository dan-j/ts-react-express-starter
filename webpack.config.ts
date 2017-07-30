// we normally aren't allowed `import` being here because our tsconfig.json file targets ES6
// modules and `ts-node` doesn't support ES6 (hence the use of webpack). However, because the
// only place where `Webpack` is referenced is inside type declarations, the import statement is
// removed at transpilation-time so no error occurs.
import { Configuration, Plugin } from 'webpack';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const entry = ['./client/index.tsx'];

const plugins: Plugin[] = [
    new CopyWebpackPlugin([{
        from: 'client/index.html',
    }]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
];

const babelPlugins: string[] = [];

if (process.env.NODE_ENV === 'development') {

    const devEntries = [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
    ];

    entry.unshift(...devEntries);

    const devPlugins: Plugin[] = [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ];

    plugins.unshift(...devPlugins);

    babelPlugins.push('react-hot-loader/babel');
}

const config: Configuration = {
    entry,
    plugins,

    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist/client'),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.tsx?$/,
            include: path.resolve('client'),
            exclude: [/node_modules/, path.resolve('server')],
            use: [{
                loader: 'babel-loader',
                options: {
                    /* we want to disable es2015 modules ONLY in front-end code for HMR
                     * so we have to disable .babelrc and configure babel for webpack here.
                     */
                    babelrc: false,
                    presets: [['es2015', { modules: false }], 'react'],
                    plugins: babelPlugins,
                },
            }, {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'client/tsconfig.json',
                },
            }],
        }, {
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true,
                },
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]',
                },
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            }],
        }],
    },

    devServer: {
        port: 8080,
        historyApiFallback: true,
        hotOnly: true,
        contentBase: path.resolve(__dirname, 'dist/client'),
    },
};

module.exports = config;
