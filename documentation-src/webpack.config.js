'use strict';

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/, exclude: /node_modules/, loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  output: {
    filename: '[name].js'
  }
};