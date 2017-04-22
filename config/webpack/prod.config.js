const webpack = require("webpack");

module.exports = PATHS => () => ({
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
});
