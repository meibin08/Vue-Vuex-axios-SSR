const path = require('path')
const webpack = require('webpack')
const vueConfig = require('../vue-loader.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  devtool: false,
  entry: {
    app: './build/entry/client.js'
  },
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
        loader: 'file-loader?name=fonts/[name].[ext]?[hash]',
        /*options: {
          name: '[name].[hash:5].[ext]?[hash]',
          outputPath: 'fonts/',
          publicPath: 'https://github.com/meibin08/'
        }*/
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
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
  plugins:[
    new CopyWebpackPlugin([
      { 
       from: path.resolve(__dirname, '../../src/public'),
       to: path.resolve(__dirname, '../../assets/public')
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
    ]
    
}
