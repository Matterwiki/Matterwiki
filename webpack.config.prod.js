const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "client/public");
const APP_DIR = path.resolve(__dirname, "client/src");

module.exports = {
  entry: [
    // entry point
    APP_DIR + "/index.js"
  ],
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath: BUILD_DIR
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        include: APP_DIR,
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /react-icons\/(.)*(.js)$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  resolve: {
    modules: [
      path.resolve("./"),
      path.resolve("./client/src"),
      path.resolve("./node_modules")
    ]
  }
};
