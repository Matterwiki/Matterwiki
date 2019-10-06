const webpack = require("webpack");
const path = require("path");

const config = require("dotenv").config({ path: `config.production.env` });

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "dist/");
const APP_DIR = path.resolve(__dirname, "src/client");

module.exports = {
  mode: "production",
  context: BUILD_DIR,
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: "[name].js"
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, "index.html")
    }),
    new webpack.DefinePlugin({
      apiUrl: JSON.stringify(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => module.context && module.context.indexOf("node_modules") !== -1
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
          plugins: ["transform-class-properties", "transform-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader",
        exclude: /node_modules/,
        options: {
          name: "./assets/[name].[ext]"
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "./fonts/[name].[ext]"
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./"), path.resolve("./src/client"), path.resolve("./node_modules")]
  }
};
