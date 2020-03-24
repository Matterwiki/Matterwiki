const react = require('@neutrinojs/react')
const jest = require('@neutrinojs/jest')
const devServer = require('@neutrinojs/dev-server')

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
            babel: {
                // TODO: Filter to NODE_ENV=development only
                plugins: ['react-hot-loader/babel']
            }
        }),
        (neutrino) => {
            neutrino.config.resolve.alias.set('@', neutrino.options.source)
            // TODO: Filter to NODE_ENV=development only
            neutrino.config.resolve.alias.set('react-dom', '@hot-loader/react-dom')
        },
        jest(),
        devServer({
            port: 3000,
            overlay: true,
            hot: true,
            liveReload: false,
            watchContentBase: true,
            proxy: {
                '/api/': { target: 'http://localhost:5000/' },
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
                ignored: /node_modules/
            }
        }),
    ],
}
