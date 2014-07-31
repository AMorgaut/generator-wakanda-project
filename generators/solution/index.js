// yo wakanda-project:solution

var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.NamedBase.extend({

    // The name `constructor` is important here
    constructor: function constructor() {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);

        // arguments
        this.argument('solutionName', {
            desc: 'The name of the wakanda solution (prompted otherwise)',
            required: false,
            type: String
        });
        // options
        this.option('project', {
            desc: 'Create a new Wakanda project for the solution',
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
        this.option('path', {
            desc: 'Directory path in which the solution should be created',
            required: false,
            type: Boolean,
            default: true
        });
    },

    createSolution: function createSolution() {

        var solutionPath = this.options.path || process.cwd();
        var solutionName = this.solutionName || this.answers.solutionName;

        this.log('Creating the solution');

        // todo: copy all file/folder from remote solution template & apply engine on filenames too
        // todo: support wakanda template files pattern (see issue https://github.com/yeoman/generator/issues/517)
        this.copy('$(solutionName).waSolution', solutionPath + path.sep + solutionName + '.waSolution');
        this.copy('Directory.waDirectory', solutionPath + path.sep + 'Directory.waDirectory');
        this.copy('Settings.waSettings', solutionPath + path.sep + 'Settings.waSettings');
    }

});