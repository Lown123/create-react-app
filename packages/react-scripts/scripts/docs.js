'use strict';

// Ensure environment variables are read.
require('../config/env');

const spawn = require('react-dev-utils/crossSpawn');
const path = require('path');
const paths = require('../config/paths');

const command = path.join(paths.appNodeModules, '.bin/docz');
const args = ['dev'];

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
