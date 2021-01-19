const reactComponents = require('@neutrinojs/react-components')
const jest = require('@neutrinojs/jest')

module.exports = {
    options: {
        root: __dirname,
    },
    use: [reactComponents(), jest()],
}
