const webpack = require("webpack");

module.exports = PATHS => () => ({
  entry: [
    // react HMR specific stuff
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?http://localhost:5000/",
    "webpack/hot/dev-server"
  ],

  output: {
    devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]"
  },

  // enabling sourcemaps for easier debugging
  devtool: "cheap-module-source-map",

  devServer: {
    hot: true,
    inline: true,
    contentBase: PATHS.build
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
