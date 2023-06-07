/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
