// yo wakanda-project

'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WakandaProjectGenerator = yeoman.generators.Base.extend({

  // The name `constructor` is important here
  constructor: function () {
      // Calling the super constructor is important so our generator is correctly setup
      yeoman.generators.Base.apply(this, arguments);

      // arguments
      this.argument('projectName', {
          desc: 'The name of the wakanda project (prompted otherwise)',
          required: false,
          type: String
      });
      // options
      this.option('add', {
          desc: 'Add to the current wakanda solution',
          required: false,
          type: Boolean,
          default: false
      });
      this.option('git', {
          desc: 'Create a dedicated local git repository',
          required: false,
          type: Boolean,
          default: true
      });

  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
        var done = this.async();
        var generator = this;
        var questions = [];

        if (!this.projectName) {
            questions.push({
                type    : 'input',
                name    : 'projectName',
                message : 'Your project name',
                default : this.appname // Default to current folder name
            });
        }

        if (!this.options.add) {
            questions.push({
                type: 'list',
                name: 'solution',
                message: 'Projects needs a Wakanda Solution to run',
                choices: [
                    {
                        value: 'create',
                        name: 'Create a New Solution'
                    }, {
                        value: 'auto',
                        name: 'Auto-detect Current Solution'
                    }, {
                        value: 'addTo',
                        name: 'Add to an Existing Solution'
                    }, {
                        value: 'ignore',
                        name: 'Skip reference from solution'
                    }
                ],
                default : 'create'
            }, {
                when: function(answers) {
                    return answers.solution === 'create';
                },
                type    : 'input',
                name    : 'solutionName',
                message : 'What should be the name of the solution?',
                default : function (answers) {
                    return answers.projectName || generator.projectName;
                }
            }, {
                when: function(answers) {
                    return answers.solution !== 'auto';
                },
                type    : 'input',
                name    : 'solutionPath',
                message : 'What should be the solution path?',
                default: function (answers) {
                    var solutionPath = '';
                    if (answers.solutionName) {
                        solutionPath = path.normalize([
                            process.cwd(),
                            '..',
                            answers.solutionName + ' Solution'
                        ].join(path.sep));
                    }
                    return solutionPath;
                }
            });
        }

        this.prompt(questions, function (answers) {
            generator.answers = answers;
            if (answers.projectName) {
                generator.projectName = answers.projectName;
            }
            done();
        }.bind(this));
  },

  createSolution: function () {
      if (this.answers.solution !== 'create') {
        return;
      }

      this.invoke('wakanda-project:solution', {
          args: [this.answers.solutionName],
          options: {
              git: this.options.git,
              path: this.answers.solutionPath
          }
      });
  },

  writing: {
    app: function () {
      this.log('Creating the project');
      // todo: copy all file/folder from remote project template ? & apply engine on filenames too ?
      // todo: support wakanda template files pattern (see issue https://github.com/yeoman/generator/issues/517)
      this.dest.mkdir('certificates');
      this.dest.mkdir('DataFolder');
      this.dest.mkdir('Modules');
      this.dest.mkdir('WebFolder');
      this.dest.mkdir('WebFolder/images');
      this.dest.mkdir('WebFolder/index.waPage');

      this.template('_package.json', 'package.json');
      this.src.copy('$(projectName).waProject', this.projectName + '.waProject');
      this.src.copy('Model.waModel', 'Model.waModel');
      this.src.copy('Model.js', 'Model.js');
      this.src.copy('Settings.waSettings', 'Settings.waSettings');
      this.src.copy('Permissions.waPerm', 'Permissions.waPerm');
      this.src.copy('WebFolder/favicon.ico', 'WebFolder/favicon.ico');
      this.src.copy('WebFolder/index.waPage/index.html', 'WebFolder/index.waPage/index.html');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  addProjectToSolution: function () {
      if (!this.options.add) return;
      this.log('method addProjectToSolution to be implemented');
  },

  gitInit: function gitInit() {
      if (!this.options.git) return;
      this.log('method gitInit to be implemented');
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = WakandaProjectGenerator;
