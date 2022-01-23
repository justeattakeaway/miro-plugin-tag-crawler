const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './index.ts',
        sidebar: './sidebar.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: "img", to: "img" },
            ]
        }),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            inject: false,
            filename: 'index.html',
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['sidebar'],
            inject: false,
            filename: 'sidebar.html',
            template: 'sidebar.html'
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
};