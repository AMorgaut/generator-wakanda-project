// yo wakanda-project

var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var WAKANDA_TEMPLATE_OPTIONS ={
    matcher: /\$\((.+?)\)/g,
    detecter: /\$\((.+?)\)/,
    start: '$(',
    end: ')'
};

//WAKANDA_TEMPLATE_OPTIONS = {interpolate: /\$\((.+?)\)/g};

module.exports = yeoman.generators.Base.extend({

    // The name `constructor` is important here
    constructor: function constructor() {
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

    promptTask: function () {
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
                        name: 'Create a New Solution',
                        checked: true
                    }, {
                        value: 'auto',
                        name: 'Auto-detect Current Solution',
                        checked: true
                    }, {
                        value: 'addTo',
                        name: 'Add to an Existing Solution',
                        checked: true
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
            done();
        }.bind(this));
    },

    createSolution: function createSolution() {
        if (this.answers.solution != 'create') return;

        this.invoke('wakanda-project:solution', {
            args: [this.answers.solutionName],
            options: {
                git: this.options.git,
                path: this.answers.solutionPath
            }
        });
    },

    createProject: function createProject() {

        this.log('Creating the project');

        // todo: copy all file/folder from remote project template & apply engine on filenames too
        // todo: support wakanda template files pattern (see issue https://github.com/yeoman/generator/issues/517)
        this.directory("Modules", "Modules");
        this.directory("certificates", "certificates");
        this.copy('$(projectName).waProject', this.answers.projectName || this.projectName + '.waProject');
        this.copy('Model.waModel', 'Model.waModel');
        this.copy('Settings.waSettings', 'Settings.waSettings');
        this.copy('Permissions.waPerm', 'Permissions.waPerm');

        //this.directory("DataFolder", "DataFolder");
        this.directory("Webfolder", "Webfolder");
        //this.directory("Modules", "Modules");
        //this.directory("certificates", "certificates");

    },

    addProjectToSolution: function addProjectToSolution() {
        if (!this.options.add) return;
        this.log('method addProjectToSolution to be implemented');
    },

    gitInit: function gitInit() {
        if (!this.options.git) return;
        this.log('method gitInit to be implemented');
    },

    init: function () {
        this.helperMethod = function () {
            this.log('won\'t be called automatically');
        };
    }
});








/*
var Generator = module.exports = yeoman.generators.Base.extend({
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });

  promptTask: function () {
    var done = this.async();

  // ASK FOR SOLUTION CREATION
    this.prompt({
      type    : "input",
      name    : "solution",
      message : "Create a solution (Y/n)",
      default : true
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));

  // GET PROJECT NAME
  promptTask: function () {
    var done = this.async();
    this.prompt({
      type    : "input",
      name    : "name",
      message : "Your project name",
      default : this.appname // Default to current folder name
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  }

});
*/