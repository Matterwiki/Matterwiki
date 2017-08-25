// TODO extract common chunks from dev and production configs, use webpack-merge compose the final webpack config

const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "dist/");
const APP_DIR = path.resolve(__dirname, "src/client");

module.exports = {
  context: BUILD_DIR,
  entry: [
    // make sure this is at the top
    "webpack-hot-middleware/client?reload=true",

    // entry point
    `${APP_DIR}/index.js`
  ],
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: "bundle.js"
  },
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
        exclude: /node_modules/,
        options: {
          presets: [["env", { modules: false }], "react"],
          plugins: [
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "url-loader",
        options: {
          limit: 25000,
          name: "./assets/[name].[ext]"
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
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
