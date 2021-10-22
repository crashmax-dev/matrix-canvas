const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { port, paths } = require('./webpack.config')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port,
    open: true,
    compress: true,
    static: {
      directory: paths.public
    }
  }
})