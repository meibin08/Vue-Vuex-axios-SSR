const path = require('path')
const webpack = require('webpack')
const vueConfig = require('../vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


module.exports = {
  devtool: false,
  entry: './build/entry/server.js',
  output: {
    path: path.resolve(__dirname, '../../assets'),
    // filename :'js/[name].js',
    publicPath: '/assets/',
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../../public'),
      'src':path.resolve(__dirname, '../../src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]?[hash]'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  }
}
