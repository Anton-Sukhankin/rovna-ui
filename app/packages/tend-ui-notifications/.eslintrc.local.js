/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@rovna-ui/eslint-local-config');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  ...base,
  settings: {
    'import/resolver': {
      alias: {
        map: [['@notifications', './src']],
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
