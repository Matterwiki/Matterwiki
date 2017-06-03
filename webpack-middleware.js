// webpack stuff 
module.exports = function(app) {
  var webpack = require("webpack");
  var webpackDevMiddleware = require("webpack-dev-middleware");
  var webpackHotMiddleware = require('webpack-hot-middleware');  
  var webpackConfig = require("./webpack.config");

  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

  