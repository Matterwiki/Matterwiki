const react = require('@neutrinojs/react')
const jest = require('@neutrinojs/jest')
const { merge } = require('lodash')

/**
 * Inspired by vue-cli, this alias allows for import paths like this:
 *
 * ```
 * import {...} from @/common/ui
 * ```
 *
 * @param {*} neutrino
 */
function setRootAlias(neutrino) {
    neutrino.config.resolve.alias.set('@', neutrino.options.source)
}

/**
 * Enables HMR for React 16.8+, only available in `development` mode
 *
 * @see https://github.com/gaearon/react-hot-loader/issues/1227#issuecomment-482514844
 * @param {*} neutrino
 */
function enableHmrForReactHooks(neutrino) {
    neutrino.config.when(process.env.NODE_ENV === 'development', config => {
        config.resolve.alias.set('react-dom', '@hot-loader/react-dom')
        config.module
            .rule('compile')
            .use('babel')
            .tap(options =>
                merge(
                    {
                        plugins: ['react-hot-loader/babel'],
                    },
                    options,
                ),
            )
    })
}

/**
 * Sets up `webpack-dev-server` configuration
 * Only available in `development` mode
 * @param {*} neutrino
 */
function setupWebpackDevServer(neutrino) {
    neutrino.config.when(process.env.NODE_ENV === 'development', config => {
        config.devServer.merge({
            port: 3000,
            overlay: true,
            hot: true,
            liveReload: false,
            watchContentBase: true,
            proxy: {
                // Proxy the API urls so client and API could be served from the same port!
                // In production, some sort of reverse proxy will have to be used.
                '/api/': { target: 'http://localhost:5000/' },
                '/static/': { target: 'http://localhost:5000/' },
            },
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false,
            },
            watchOptions: {
                ignored: /node_modules/,
            },
        })
    })
}

/**
 * Logs generated webpack config
 * @param {*} neutrino
 */
// eslint-disable-next-line no-unused-vars
function logConfig(neutrino) {
    console.log(neutrino.config.toString({ configPrefix: 'neutrino.config' }))
}

// TODO: https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility
//       https://neutrinojs.org/usage/#generating-multiple-builds
module.exports = {
    options: {
        root: __dirname,
        output: 'dist',
    },
    use: [
        react({
            html: {
                title: 'Matterwiki',
            },
        }),
        setRootAlias,
        enableHmrForReactHooks,
        setupWebpackDevServer,
        // Enable to log generated webpack config
        // logConfig,
        jest(),
    ],
}
