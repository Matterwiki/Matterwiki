const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (PATHS, env) => () => ({
  entry: [
    // polyfill for fetch API (Safari)
    // TODO a better way to handle this, maybe?
    "whatwg-fetch",
    PATHS.client + "/index.jsx"
  ],
  output: {
    path: PATHS.build,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // check .babelrc
        use: ["babel-loader"]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        // check .babelrc
        use: ["babel-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.client}/index.html`
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
});
