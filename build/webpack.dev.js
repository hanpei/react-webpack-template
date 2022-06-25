const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    port: 3000,
    compress: false, // gzip压缩
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public'),
    },
  },
});
