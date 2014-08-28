// yo wakanda-project

'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var os = require('os');

var yeoman = require('yeoman-generator');
var yosay = require('yosay');

function installDestDependencies(dest) {
  if (this.options.skippInstall) return;
  var spawn = require('child_process').spawn;
  spawn('npm', ['install'], {cwd: dest, stdio: 'inherit'});
  //spawn('bower', ['install'], {cwd: dest, stdio: 'inherit'});
}

var WakandaProjectGenerator = yeoman.generators.Base.extend({

  // The name `constructor` is important here
  constructor: function () {
      // Calling the super constructor is important so our generator is correctly setup
    yeoman.generators.Base.apply(this, arguments);

    this.baseRoot = this.destinationRoot();

    // arguments
    this.argument('projectName', {
      desc: 'The name of the wakanda project (prompted otherwise)',
      required: false,
      type: String
    });

    // options
    this.option('path', {
      desc: 'Specify a custom path for the project folder',
      required: false,
      type: String
    });
    this.option('description', {
      desc: 'Specify description of the project',
      required: false,
      type: String
    });
    this.option('serverPath', {
      desc: 'Specify the Wakanda Server path',
      required: false,
      type: String
    });
    this.option('withSolution', {
      desc: 'Create a Wakanda Solution and bind the project to it',
      required: false,
      type: String
    });
    this.option('forSolution', {
      desc: 'Path of a solution to from which the project must be launched',
      required: false,
      type: String,
      default: ''
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
    if (!this.options.path) {
      questions.push({
        type    : 'input',
        name    : 'path',
        message : 'Path of your Project folder?',
        default: function (answers) {
          return (answers.projectName || generator.projectName) + path.sep;
        }
      });
    }
    if (!this.options.description) {
      questions.push({
        type    : 'input',
        name    : 'description',
        message : 'Description of your Project?',
        default: function (answers) {
          var project, desc;
          project = answers.projectName || generator.projectName;
          desc = project + ' Wakanda project created trough Yeoman';
          return desc;
        }
      });
    }
    if (!this.options.serverPath) {
      questions.push({
        type    : 'input',
        name    : 'serverPath',
        message : 'What is the path of your Wakanda Server',
        default: function (answers) {
          switch (os.platform()) {
            case 'win32':
              return 'c:\\wakanda versions\\wak2\\wakanda server\\wakanda server.exe';
            case 'darwin':
              return '/Applications/Wakanda\\ Server.app/Contents/MacOS/Wakanda\\ Server';
            default:
              return './wakanda'
          }
        }
      });
    }
    if (!this.options.withSolution) {
      questions.push({
        type: 'list',
        name: 'solution',
        message: 'Projects needs a Wakanda Solution to run',
        choices: [{
          value: 'create',
          name: 'Create a New Solution'
        }, {
          value: 'auto',
          name: 'Auto-detect Current Solution'
        }, {
          value: 'addTo',
          name: 'Add to a specific Solution'
        }, {
          value: 'skip',
          name: 'Skip reference from solution'
        }],
        default : 'create'
      }, {
        when: function(answers) {
          return answers.solution === 'addTo';
        },
        type    : 'input',
        name    : 'solutionFile',
        message : 'What is the path the solution file?'
      });
    }

    this.prompt(questions, function (answers) {
      generator.answers = answers;
      done();
    }.bind(this));
  },

  configuring: function () {
    if (this.answers.projectName) {
      this.projectName = this.answers.projectName;
    }
    this.projectPath = this.options.path || this.answers.path;
    this.projectRoot = this.baseRoot + path.sep + this.projectPath;
    this.description = this.options.description || this.answers.description;
    this.serverPath = this.options.serverPath || this.answers.serverPath;
    this.solutionFile = this.options.forSolution || this.answers.solutionFile;
  },

  createSolution: function () {
    var done = this.async();
    var generator = this;

    if (this.answers.solution === 'create' || this.options.withSolution) {

      this.invoke(
        'wakanda-project:solution',
        {options: {
          projects: this.projectRoot + path.sep + this.projectName + '.waProject'
        }}, function () {
          generator.solutionFile = JSON.parse(generator.read(process.cwd() + '/.solution')).path;
          done();
        }
      );

    }
  },

  writing: {
    app: function () {
      this.log('Creating the project');
      this.destinationRoot(this.projectRoot);

      // todo: copy all file/folder from remote project template ? & apply engine on filenames too ?
      // todo: support wakanda template files pattern (see issue https://github.com/yeoman/generator/issues/517)
      this.dest.mkdir('certificates');
      this.dest.mkdir('DataFolder');
      this.dest.mkdir('Modules');
      this.dest.mkdir('WebFolder');
      this.dest.mkdir('WebFolder/images');
      this.dest.mkdir('WebFolder/index.waPage');

      this.src.copy('$(projectName).waProject', this.projectName + '.waProject');
      this.src.copy('Model.waModel', 'Model.waModel');
      this.src.copy('Model.js', 'Model.js');
      this.src.copy('Settings.waSettings', 'Settings.waSettings');
      this.src.copy('Permissions.waPerm', 'Permissions.waPerm');
      this.src.copy('WebFolder/favicon.ico', 'WebFolder/favicon.ico');
      this.src.copy('WebFolder/index.waPage/index.html', 'WebFolder/index.waPage/index.html');

      this.destinationRoot(this.baseRoot);

      // TODO: Use dedicated Gruntfile.js and package.json at the main level
      if (this.answers.solution === 'addTo') {
        this.template('_solution', '.solution');
      }

      this.template('_package.json', 'package.json');
      this.template('_Gruntfile.js', 'Gruntfile.js');

    },

    mainRootFiles: function () {/*      
      this.dest.copy('.solution', this.projectPath + '/.solution');
      this.dest.copy('package.json', this.projectPath + '/package.json');
      this.dest.copy('Gruntfile.js', this.projectPath + '/Gruntfile.js');
      */
    },

    projectfiles: function () {
      this.destinationRoot(this.projectRoot);

      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');

      this.destinationRoot(this.baseRoot);
    }
  },

  addProjectToSolution: function () {
    var solutionFile, solutionDir, relativePath, content;

    if (this.answers.solution !== 'addTo') {
      return;
    }

    solutionFile = this.solutionFile;
    solutionDir = path.dirname(solutionFile);
    relativePath = path.relative(solutionDir, this.projectPath);
    content = '\n\t<project path="' + relativePath + '"/>';

    content = this.append(solutionFile, 'solution', content);
    this.write(solutionFile, content);
  },

  end: function () {
    this.installDependencies();
    //installDestDependencies.call(this, this.projectRoot);
  }
});

module.exports = WakandaProjectGenerator;
