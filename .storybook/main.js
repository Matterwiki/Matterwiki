const customWebpackConfig = require('../src/client/webpack.config');

module.exports = {
  stories: ['../src/client/ui/stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-storysource']
}
