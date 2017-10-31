const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/ExtraDate.js',
    output: {
        filename: 'ExtraDate.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new CleanWebpackPlugin('dist/*.js')
    ]
};