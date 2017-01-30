
/* 
 * TODO extract common chunks from dev and production configs 
 * and use something like webpack-merge to put them all together for the environment needed
 * Ref : http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
 */

const webpack = require('webpack');
const path = require('path');

// TODO separate files for constants?
const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

module.exports = {
  entry: [
    // react HMR specific stuff
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:5000/',
    'webpack/hot/dev-server',

    // polyfill for fetch API (Safari)
    // TODO a better way to handle this, maybe?
    'whatwg-fetch', 

    // entry point
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,    
    publicPath : '/public/',
    filename: 'bundle.js'
  },
  // enabling sourcemaps for easier debugging
  devtool : 'inline-source-map',
  // again for react HMR
  devServer : {
    hot : true,
    inline : true,
    contentBase : BUILD_DIR,
    publicPath : '/public/'
  },
  plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel-loader',
        include : APP_DIR,
        exclude : /node_modules/ ,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};