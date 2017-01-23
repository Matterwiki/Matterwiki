var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client', 'public');
var APP_DIR = path.resolve(__dirname, 'client', 'app');

var config = {
  entry: ['whatwg-fetch', path.join(APP_DIR, 'index')],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules: [{
      test : /\.(js|jsx)$/,
      include : APP_DIR,
      loader : 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
