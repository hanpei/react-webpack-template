const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'production',

  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: (source) => {
            return !source.includes('index.html'); // 忽略index.html
          },
        },
      ],
    }),

    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),

    // 清理无用css插件
    new PurgeCSSPlugin({
      paths: glob.sync(
        [
          `${path.join(__dirname, '../src')}/**/*`,
          `${path.join(__dirname, '../public/index.html')}`, // 需要保证body上的样式不被清理掉
        ],
        {
          nodir: true,
        }
      ),
    }),
  ],

  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),

      // 压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],

    // 分隔代码
    splitChunks: {
      cacheGroups: {
        // 提取node_modules代码为 vendor.[chunkhash:8].js
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        // 提取页面公共代码为 commons.[chunkhash:8].js
        commons: {
          name: 'commons',
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});
