'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const spawn = require('react-dev-utils/crossSpawn');
const path = require('path');
const paths = require('../config/paths');

// Gets the path to docz bin
const command = path.join(paths.appNodeModules, '.bin/docz');
const args = ['dev'];

// Gets path to the lucid-scripts docz config
const doczConfigPath = require.resolve(
  path.join(__dirname, '..', 'config', 'docz.config.js')
);

args.push(`--config=${doczConfigPath}`);

const proc = spawn.sync(command, args, {
  stdio: 'inherit',
});

if (proc.status !== 0) {
  console.error(`\`${command} ${args.join(' ')}\` failed`);
  return;
}
