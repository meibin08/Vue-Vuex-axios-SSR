const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['vue-style-loader', 'css-loader','sass-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: false
  }
})
config.plugins = config.plugins.concat([
  // strip dev-only code in Vue source
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': '"client"'
  }),
  // extract vendor chunks for better caching
  new FriendlyErrorsPlugin()
]);

module.exports = config
