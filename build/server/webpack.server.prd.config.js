const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const config = merge(base, {
  target: 'node',
  devtool: false,
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
    }
  },
  module: {
    rules: [ 
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize!sass-loader',
          fallback: 'vue-style-loader'
        })
      }
    ]
  },

  performance: {
    maxEntrypointSize: 300000,
    hints:  'warning'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  })
})
config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new ExtractTextPlugin({
      filename: 'css/common.[chunkhash].css'
    })
];

module.exports = config
