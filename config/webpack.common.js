const path = require('path'); 
const JSRules = require('./loaders/javaScript'); 
const StyleRules = require('./loaders/styles')
const HtmlRules = require('./loaders/html')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js', 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'develop.js'
    }, 
    stats: { warnings: false }, 
    resolve: {
        extensions: ['.js', '.jsx']
    }, 
    module: {
       rules: [JSRules, StyleRules, HtmlRules]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html', filename: './index.html' }), 
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }), 
        new MiniCssExtractPlugin()
    ]
}