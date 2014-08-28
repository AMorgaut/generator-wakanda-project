// yo wakanda-project:solution

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WakandaProjectGenerator = yeoman.generators.NamedBase.extend({

  // The name `constructor` is important here
  constructor: function constructor() {
    // Calling the super constructor is important so our generator is correctly setup
    yeoman.generators.Base.apply(this, arguments);

    this.baseRoot = this.destinationRoot();

    // arguments
    this.argument('solutionName', {
    	desc: 'The name of the wakanda solution (prompted otherwise)',
    	required: false,
    	type: String
    });

    // options
    this.option('path', {
      desc: 'Directory path in which the solution should be created',
      required: false,
      type: Boolean,
      default: true
    });
    this.option('project', {
      desc: 'Create a new Wakanda project for the solution',
      required: false,
      type: Boolean,
      default: false
    });
    this.option('projects', {
      desc: 'Add projects to the solution',
      required: false,
      type: Boolean,
      default: false
    });
  },

  initializing: function () {
    //this.log('You called the wakanda-project subgenerator with the argument ' + this.name + '.');
  },

  prompting: function () {
    var done = this.async();
    var generator = this;
    var questions = [];

    if (!this.solutionName) {
      questions.push({
        type    : 'input',
        name    : 'solutionName',
        message : 'Your solution name',
        default : this.appname // Default to current folder name
      });
    }

    if (!this.options.path) {
      questions.push({
        type    : 'input',
        name    : 'path',
        message : 'Path of your Solution folder?',
        default : function (answers) {
          return (answers.solutionName || generator.solutionName) + ' Solution' + path.sep;
        }
      });
    }

    if (!this.options.projects) {
      questions.push({
        type    : 'input',
        name    : 'addProjects',
        message : 'Add projects to your solution?',
        default : 'Y'
      }, {
        when    : function (answers) {
          return answers.addProjects === 'Y';
        },
        type    : 'input',
        name    : 'projects',
        message : 'What is the project path?'
      });
    }

    this.prompt(questions, function (answers) {
      generator.answers = answers;
      done();
    }.bind(this));
  },

  configuring: function () {
    var relativePath;

    if (this.answers.solutionName) {
      this.solutionName = this.answers.solutionName;
    }
    this.solutionPath = this.answers.path || this.options.path;
    this.solutionRoot = this.baseRoot + path.sep + this.solutionPath;
    this.solutionFile = this.solutionRoot + this.solutionName + '.waSolution';
    this.projects = this.answers.projects || this.options.projects;

    relativePath = path.relative(this.solutionRoot, this.projects);
    this.projectNodes = '\n  <project path="' + relativePath + '"/>';
  },

  writing: {
    app: function () {
      this.log('Creating the solution');
      
      this.template('_solution', '.solution');

      // todo: copy all file/folder from remote solution template? & apply engine on filenames too?
      // todo: support wakanda template files pattern (see issue https://github.com/yeoman/generator/issues/517)
      this.template('$(solutionName).waSolution', this.solutionPath + this.solutionName + '.waSolution');
      
      this.destinationRoot(this.solutionRoot);

      
      this.src.copy('Directory.waDirectory', 'Directory.waDirectory');
      this.src.copy('Settings.waSettings', 'Settings.waSettings');

      this.destinationRoot(this.baseRoot);

    },

    projectfiles: function () {
      this.destinationRoot(this.projectRoot);

      //this.src.copy('gitignore', '.gitignore');
      //this.src.copy('editorconfig', '.editorconfig');
      //this.src.copy('jshintrc', '.jshintrc');

      this.destinationRoot(this.baseRoot);
    }
  },

  addProjectToSolution: function () {
    /*
    var relativePath, content;

    if (!this.projects) {
      return;
    }
    
    debugger;
    this.log('add to solution: ' + this.solutionFile);
    
    relativePath = path.relative(this.solutionRoot, this.projects);
    content = '\n\t<project path="' + relativePath + '"/>';
    this.log('solution content to add:\n' + content);
    
    content = this.append(this.solutionFile, 'solution', content);
    this.log('new solution content:\n' + content);
    this.write(this.solutionFile, content);
    */
  },

  end: function () {
    //this.installDependencies();
  }
});

module.exports = WakandaProjectGenerator;
