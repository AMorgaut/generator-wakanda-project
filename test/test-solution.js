/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wakanda-project:solution name', function () {
  // TODO: NEED TO FIND WHY withArguments() AND withPrompt() don't work
  /*
  before(function (done) {
    //this.timeout(15000);
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name')
      .withPrompt({{
        solutionName: 'name',
        path: 'name Solution/',
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'name Solution/name.waSolution',
      'name Solution/Directory.waDirectory',
      'name Solution/Settings.waSettings'
    ]);
  });
*/
});
