const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  plugins: [
    new CleanWebpackPlugin(['../build']),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './public/index.html',
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, '../src'), '../node_modules'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
