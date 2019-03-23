const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: path.join(__dirname, '../src/scripts/popup.ts'),
        background: path.join(__dirname, '../src/scripts/background.ts'),
        settings: path.join(__dirname, '../src/scripts/settings.ts'),
        tabmanager: path.join(__dirname, '../src/scripts/tabmanager.ts'),
        promisify: path.join(__dirname, '../src/scripts/promisify.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'scripts/[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new CopyPlugin([
            { from: 'app/', to: '' }
        ])
    ]
};