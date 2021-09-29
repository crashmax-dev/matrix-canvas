const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { paths } = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          to: paths.output,
          from: paths.public,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store']
          }
        }
      ]
    })
  ]
})