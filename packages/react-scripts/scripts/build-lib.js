// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
// @remove-on-eject-begin
// Do the preflight checks (only happens before eject).
const verifyPackageTree = require('./utils/verifyPackageTree');
if (process.env.SKIP_PREFLIGHT_CHECK !== 'true') {
  verifyPackageTree();
}
// REMOVED BECAUSE IT BREAKS THINGS @fleusin
// const verifyTypeScriptSetup = require('./utils/verifyTypeScriptSetup');
// verifyTypeScriptSetup();
// @remove-on-eject-end

const spawn = require('react-dev-utils/crossSpawn');
const path = require('path');
const paths = require('../config/paths');

const command = path.join(paths.appNodeModules, '.bin/tsc');
const args = [];

const proc = spawn.sync(command, args, {
  stdio: 'inherit',
});

if (proc.status !== 0) {
  console.error(`\`${command} ${args.join(' ')}\` failed`);
  return;
}
