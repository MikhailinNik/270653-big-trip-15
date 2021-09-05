'use strict';

const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: publicPath,
  },

  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    watchContentBase: true,
  },
  
  module: {
    rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@presenter': path.resolve(__dirname, 'src/presenter'),
      '@mock': path.resolve(__dirname, 'src/mock'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
};
