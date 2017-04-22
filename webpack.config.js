const path = require("path");
const merge = require("webpack-merge");

// constants
const PATHS = {
  client: path.resolve(__dirname, "client"),
  build: path.resolve(__dirname, "dist")
};

// get the configs
let commonConfig = require("./config/webpack/common.config");
let devConfig = require("./config/webpack/dev.config");
let prodConfig = require("./config/webpack/prod.config");

module.exports = env => {
  // prep the configs 🍛
  commonConfig = commonConfig(PATHS, env);
  devConfig = devConfig(PATHS);
  prodConfig = prodConfig(PATHS);

  // merge and return the right config
  if (env === "dev") return merge(commonConfig(), devConfig());
  if (env === "prod") return merge(commonConfig(), prodConfig());
};
