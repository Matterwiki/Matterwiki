const webpack = require("webpack");
const path = require("path");

const config = require("dotenv").config({ path: `config.development.env` });

const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "dist/");
const APP_DIR = path.resolve(__dirname, "src/client");

if (config.error) throw new Error(config.error);

module.exports = {
  mode: "development",
  context: BUILD_DIR,
  entry: [`${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  serve: {
    port: 5001,
    host: "localhost",
    hot: {
      autoConfigure: true,
      port: 3001
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      apiUrl: JSON.stringify(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, "index.html")
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
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png)$/,
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
    modules: [path.resolve("./"), path.resolve("./src/client"), path.resolve("./node_modules")]
  },

  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
