/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wakanda-project:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name')
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      // Wakanda Specific
      'name.waProject',
      'Model.js',
      'Model.waModel',
      'Permissions.waPerm',
      'Settings.waSettings',
      'WebFolder/favicon.ico',
      'WebFolder/index.waPage/index.html',
      // Standard
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
