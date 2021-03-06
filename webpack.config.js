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
      { from: './src/index.html' },
      { from: './src/favicon.ico' }
    ]),
    new ExtractTextPlugin('bundle.css')
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.min.js',
      'router': path.resolve(__dirname, './src/router.js'),
      'menu': path.resolve(__dirname, './src/components/menu'),
      'test': path.resolve(__dirname, './src/components/test'),
      'user': path.resolve(__dirname, './src/user'),
      'usermenu': path.resolve(__dirname, './src/components/usermenu'),
      'dom': path.resolve(__dirname, './src/dom'),
      'actions': path.resolve(__dirname, './src/actions')
    }
  }
};