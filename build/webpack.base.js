const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),

  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/', // 打包后文件的公共前缀路径
  },

  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, '../src')],
      },
      {
        test: /.(css|scss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        include: [path.resolve(__dirname, '../src')],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // base64
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]',
        },
        include: [path.resolve(__dirname, '../src')],
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]',
        },
        include: [path.resolve(__dirname, '../src')],
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]',
        },
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': path.join(__dirname, '../src'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
  ],

  cache: {
    type: 'filesystem',
  },
};
