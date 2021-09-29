const path = require('path')

module.exports = {
  port: 8080,
  paths: {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../public')
  }
}