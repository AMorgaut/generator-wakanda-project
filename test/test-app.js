/*global describe, beforeEach, it*/

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wakanda-project:app name', function () {
  // TODO: NEED TO FIND WHY withArguments() AND withPrompt() don't work
  /*
  before(function (done) {
    //this.timeout(15000);
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name')
      .withPrompt({
        projectName: 'name',
        path: 'name/',
        solution: 'skip'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      // Wakanda Specific
      'name/name.waProject',
      'name/Model.js',
      'name/Model.waModel',
      'name/Permissions.waPerm',
      'name/Settings.waSettings',
      'name/WebFolder/favicon.ico',
      'name/WebFolder/index.waPage/index.html',
      // Standard
      'name/package.json',
      'name/.editorconfig',
      'name/.jshintrc'
    ]);
  });
*/
});
