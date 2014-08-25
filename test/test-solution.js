/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wakanda-project:solution', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      //'name.waSolution',
      'Directory.waDirectory',
      'Settings.waSettings'
    ]);
  });
});
