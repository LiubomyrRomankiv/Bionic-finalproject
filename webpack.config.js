const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ 
          fallback: 'style-loader', 
          use:  [ 'css-loader', 'sass-loader' ] 
        })
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html' }
    ]),
    new ExtractTextPlugin('bundle.css')
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};