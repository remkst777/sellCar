const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/': '' },
      },
    },
  },
});
