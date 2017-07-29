const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = merge(base, {
  target: 'node',
  devtool: '#source-map',
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
        test: /\.(css|scss|sass)$/,
        use: ['vue-style-loader', 'css-loader','sass-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints:  false
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
})
config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
    new FriendlyErrorsPlugin()
];

module.exports = config
