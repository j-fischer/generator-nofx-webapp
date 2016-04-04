'use strict';
var os = require('os');
var path = require('path');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var expect = require('chai').expect;
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-nofx-webapp:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

  it('creates configuration files', function () {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.hgignore',
      '.jshintrc',
      '.bowerrc',
      '.jsdoc',
      'package.json',
      'bower.json',
      'Gruntfile.js'
    ]);
  });

  it('creates all app and test files', function () {
    assert.file([
      'app',
      'test',
      'karma.conf.js'
    ]);
  });
});

describe('generator-nofx-webapp:run grunt', function () {
  // Build should pass in less than 60s even on older computers.
  // Tested on late 2011 Mac Book Pro with 30-60s execution time.
  this.timeout(120000);

  var app;

  before(function (done) {
    this.timeout(4000);

    app = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'), function (dir) {
        // Note: Assumes that 'npm install' was run inside the fixtures folder.
        fs.symlinkSync(path.join(__dirname, 'fixtures/node_modules'),
          path.join(dir, 'node_modules'), 'dir');

        done();
      });
  });

  it('should pass grunt build', function (done) {
    app
      .withOptions({'skip-install': true})
      .on('end', function () {
        exec('grunt', function (error, stdout) {
          if (error) {
            console.log('Error: ' + error);
          }

          expect(stdout).to.contain('No problems');
          expect(stdout).to.contain('Executed 1 of 1 SUCCESS');
          expect(stdout).to.contain('Done, without errors.');

          assert.file(['docs/coverage', 'docs/jsdoc']);
          done();
        });
      });
  });
});
