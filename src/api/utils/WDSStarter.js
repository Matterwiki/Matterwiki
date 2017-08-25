module.exports = app => {
  // ESLint rules because this would happen only in DEV envs

  /* eslint-disable global-require */
  /* eslint-disable import/no-extraneous-dependencies */
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("../../../webpack.config");
  /* eslint-enable global-require */
  /* eslint-enable import/no-extraneous-dependencies */

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
};
