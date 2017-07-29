const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use:ExtractTextPlugin.extract({
              use: 'css-loader?minimize!sass-loader',
              fallback: 'vue-style-loader'
            })
      }
    ]
  },
})
config.plugins = config.plugins.concat([
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
    new ExtractTextPlugin({
      filename: 'css/common.[chunkhash].css'
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(top|new|show|ask|jobs)/,
          handler: 'networkFirst'
        },
        {
          urlPattern: '/item/:id',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/user/:id',
          handler: 'networkFirst'
        }
      ]
    })
    
  ]);

module.exports = config
