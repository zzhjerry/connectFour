var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/typescript/main.ts",
    output: {
        filename: "application.js",
        path: "dist"
    },

    // For debugging purpose
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],

    resolve: {
        extensions: ["", ".js", ".ts", ".d.ts"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
