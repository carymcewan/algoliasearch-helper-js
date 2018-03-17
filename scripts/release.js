#!/usr/bin/env node

'use strict';

var prompt = require('prompt');
var semver = require('semver');
var mversion = require('mversion');
var path = require('path');
var fs = require('fs');

var shell = require('shelljs');
shell.fatal = true;

var colors = require('colors');
colors.setTheme({
  error: 'red',
  info: 'green'
});

var packageJson = require('../package.json');

var _require = require('./lib/conventionalChangelog.js'),
    showChangelog = _require.showChangelog,
    getChangelog = _require.getChangelog,
    updateChangelog = _require.updateChangelog;

shell.echo('Algoliasearch-Helper release script');

checkEnvironment();
mergeDevIntoMaster();
showChangelog(shell);
promptVersion(packageJson.version, function (version) {
  bumpVersion(version, function () {
    build();
    updateChangelog(shell);
    commitNewFiles(version);
    publish();
    goBackToDevelop();
  });
});

function checkEnvironment() {
  var currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).toString().trim();

  if (currentBranch !== 'develop') {
    shell.echo('The release script should be started from develop'.error);
    process.exit(1);
  }

  var changes = shell.exec('git status --porcelain', { silent: true }).toString().trim();

  if (changes.length > 0) {
    shell.echo('The project has some uncommited changes'.error);
    process.exit(1);
  }
}

function mergeDevIntoMaster() {
  shell.echo('Merging develop into master');

  shell.exec('git fetch origin', { silent: true });
  shell.exec('git merge origin develop', { silent: true });
  shell.exec('git checkout master', { silent: true });
  shell.exec('git merge origin master', { silent: true });
  shell.exec('git merge --no-ff --no-edit develop', { silent: true });
}

function promptVersion(currentVersion, cb) {
  shell.echo('Current version is ' + packageJson.version.toString().green.bold);

  prompt.message = '?'.info;
  prompt.colors = false;
  prompt.start();
  prompt.get([{
    description: 'Enter the next version based on the changelog',
    required: true,
    conform: function conform(nextVersion) {
      return semver.valid(nextVersion) && semver.gte(nextVersion, currentVersion);
    },
    message: ('The version must conform to semver (MAJOR.MINOR.PATCH) and be greater than the current version (' + currentVersion.bold + ').').error
  }], function (err, result) {
    if (err) {
      shell.echo('\nCannot read the next version'.error);
      process.exit(1);
    }

    cb(result.question);
  });
}

function bumpVersion(newVersion, cb) {
  shell.echo('Updating files');
  shell.echo('..src/version.js');

  var versionFile = path.join(__dirname, '../src/version.js');
  var newContent = "'use strict';\n\nmodule.exports = '" + newVersion + "';\n";
  fs.writeFileSync(versionFile, newContent);

  shell.echo('..bower.json and package.json');

  mversion.update(newVersion, function (err) {
    if (err) {
      shell.echo('Unable to update files containing versions'.error);
      process.exit(1);
    }
    cb();
  });
}

function commitNewFiles(version) {
  shell.echo('Commiting files');
  var changelog = getChangelog(shell);
  changelog.splice(1, 0, '');
  shell.exec('git commit -a -m "' + changelog.join('\n') + '"', { silent: true });

  shell.echo('Creating tag');
  shell.exec('git tag ' + version, { silent: true });
}

function publish() {
  shell.echo('Pushing new commits to Github');
  shell.exec('git push origin', { silent: true });
  shell.exec('git push origin --tags', { silent: true });

  shell.echo('Publishing new version on NPM');
  shell.exec('npm publish', { silent: true });

  shell.echo('Publishing new documentation');
  shell.exec('yarn run doc:publish');
}

function goBackToDevelop() {
  shell.echo('Merging back to develop');
  shell.exec('git checkout develop && git merge --no-edit master', { silent: true });

  shell.echo('Pushing the merge to Github');
  shell.exec('git push origin develop', { silent: true });
}

function build() {
  shell.exec('yarn run build');
}