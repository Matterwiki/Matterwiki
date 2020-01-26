const appRoot = require('app-root-path')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const {
  createConfig,
  env,
  group,
  setContext,
  addPlugins,
  entryPoint,
  setMode,
  setOutput,
  sourceMaps,
  babel,
  css,
  sass,
  match,
  devServer,
  url,
  file,
  resolve
} = require('webpack-blocks')

/**
 * Custom block that extracts CSS for production mode
 * @param {object} options - https://github.com/webpack-contrib/mini-css-extract-plugin#options
 */
function extractCSS (options = {}) {
  return ({ match }, util) => util.merge({
    module: {
      rules: [
        Object.assign({
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            }
          ]
        }, match)
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(options)
    ]
  })
}

/**
 * Minify CSS files
 * @param {object} options - https://github.com/NMFR/optimize-css-assets-webpack-plugin#configuration
 */
function minifyCSS (options = {}) {
  return (context, { merge }) => merge({
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(
          Object.assign({
            cssProcessorOptions: {
              autoprefixer: false,
              discardComments: {
                removeAll: true
              },
              safe: true
            },
            canPrint: false
          }, options)
        )
      ]
    }
  })
}

/**
 * Minify JS files
 * @param {object} options - https://github.com/webpack-contrib/terser-webpack-plugin#options
 */
function minifyJS (options) {
  return (context, { merge }) => merge({
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(
          Object.assign({
            sourceMap: true
          }, options)
        )
      ]
    }
  })
}

/**
 * Splits node_modules into its own chunk
 */
function splitVendorChunk () {
  return ({ match }, { merge }) => merge({
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: Object.assign({
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }, match)
        }
      }
    }
  })
}

const BUILD_DIR = appRoot.resolve('dist/')
const APP_DIR = appRoot.resolve('src/client')

/**
 * Common config used across debug and release modes
 */
const commonConfig = () => group([
  setContext(BUILD_DIR),
  entryPoint(path.join(APP_DIR, 'index.js')),
  match(/\.js$/, {
    include: APP_DIR,
    exclude: /node_modules/
  }, [
    // TODO: Replace with webpack-babel-multi-target-plugin when it supports `@babel/preset-react`
    //       https://github.com/DanielSchaffer/webpack-babel-multi-target-plugin/issues/54
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            // https://browserl.ist/?q=defaults%2C+%3E+1%25%2C+not+dead%2C+not+ie+%3C%3D+11
            targets: 'defaults, > 1%, not dead, not ie <= 11',
            modules: false,
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: false }
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/transform-runtime',
        '@babel/plugin-proposal-class-properties'
      ]
    })
  ]),
  match(/\.(jpg|png)$/, [
    url({
      limit: 25000,
      name: './assets/[name].[ext]'
    })
  ]),
  match(/\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, [
    file({
      name: 'fonts/[name].[ext]'
    })
  ]),
  resolve({
    modules: [path.resolve(APP_DIR, './'), path.resolve(APP_DIR, './src/client'), './node_modules']
  }),
  addPlugins([
    new HtmlWebpackPlugin({
      template: path.join(APP_DIR, 'index.html')
    })
  ])
])

/**
 * Debug config. Priorities here are:
 * - HMR
 * - Great sourcemaps
 * - Quick rebuilds
 */
const debugConfig = () => group([
  setMode('development'),
  setOutput({
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js'
  }),
  sourceMaps('inline-source-map'),
  devServer({
    overlay: true,
    liveReload: true,
    watchContentBase: true,
    proxy: {
      '/api/': { target: 'http://localhost:5000/' }
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }),
  match(/\.(sa|sc|c)ss$/, [
    css(),
    sass()
  ])
])

/**
 * Release config. Priorities here are:
 * - Smaller bundle size (TODO: https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility)
 * - Minification
 * - Cache busting
 */
const releaseConfig = () => group([
  setMode('production'),
  setOutput({
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].[hash].js'
  }),
  sourceMaps('source-map'),
  match(/\.(sa|sc|c)ss$/, [
    extractCSS({
      filename: '[name].[hash].css'
    }),
    css(),
    sass()
  ]),
  minifyCSS(),
  minifyJS(),
  splitVendorChunk(),
  addPlugins([
    new CleanWebpackPlugin()
  ])
])

/**
 * The main webpack config file, composed with blocks!
 */
module.exports = createConfig([
  commonConfig(),
  env('development', [debugConfig()]),
  env('production', [releaseConfig()])
])
