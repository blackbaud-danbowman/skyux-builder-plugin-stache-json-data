/* jshint node: true */

'use strict';

const fs = require('fs-extra');
const path = require('path');

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');

function createDist() {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  fs.copySync(path.join(rootPath, 'src', 'json-data.js'), path.join(distPath, 'index.js'));
}

function makePackageFileForDist() {
  const packageJson = fs.readJSONSync(path.join(rootPath, 'package.json'));

  packageJson.module = 'index.js';

  fs.writeJSONSync(path.join(distPath, 'package.json'), packageJson, { spaces: 2 });
}

function copyFilesToDist() {
  fs.copySync(path.join(rootPath, 'README.md'), path.join(distPath, 'README.md'));
  fs.copySync(path.join(rootPath, 'CHANGELOG.md'), path.join(distPath, 'CHANGELOG.md'));
}

createDist();
makePackageFileForDist();
copyFilesToDist();
