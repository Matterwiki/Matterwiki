/*
 * TODO extract common chunks from dev and production configs
 * and use something like webpack-merge to put them all together for the environment needed
 * Ref : http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
 */

const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// TODO BUILD_DIR should ideally point to a `dist/` folder.
// This might require a little restructuring of directories
const BUILD_DIR = path.resolve(__dirname, "dist/");
const APP_DIR = path.resolve(__dirname, "src/client");

module.exports = {
  entry: [
    // make sure this is at the top
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",

    // entry point
    APP_DIR + "/index.js"
  ],
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: "bundle.js"
  },
  // enabling sourcemaps for easier debugging
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, "index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("dev")
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: APP_DIR,
        exclude: /node_modules/
      },
      // TODO include only `node_modules/react-icons` and exclude everything else in `node_modules`
      {
        test: /react-icons\/(.)*(.js)$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "url-loader",
        options: {
          limit: 25000
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve("./"),
      path.resolve("./src/client"),
      path.resolve("./node_modules")
    ]
  },

  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
