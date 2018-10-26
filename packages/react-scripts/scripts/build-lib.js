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
const verifyTypeScriptSetup = require('./utils/verifyTypeScriptSetup');
verifyTypeScriptSetup();
// @remove-on-eject-end

const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const rollup = require('rollup');
const rollupTypescript = require('rollup-typescript-plugin2');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

async function build() {
  try {
    console.log('Creating a production build...');
    const appPackage = require(paths.appPackageJson);

    const inputOptions = {
      input: paths.appIndexJs,
      external: [
        ...Object.keys(appPackage.dependencies || {}),
        ...Object.keys(appPackage.peerDependencies || {}),
      ],
      plugins: [
        rollupTypescript({
          typescript: require('typescript'),
          tsconfig: paths.appTsConfig,
        }),
      ],
    };

    const outputFormats = [
      {
        file: appPackage.main,
        format: 'cjs',
      },
      {
        file: appPackage.module,
        format: 'es',
      },
    ];

    const bundle = await rollup(inputOptions);

    await Promise.all(
      outputFormats.map(async outputOptions => {
        await bundle.write(outputOptions);
      })
    );
  } catch (err) {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  }
}

build();
