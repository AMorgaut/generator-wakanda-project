module.exports = function GruntfileModule(grunt) {

  var spawn = require('child_process').spawn;
  var fs = require('fs');

  //require('load-grunt-tasks')(grunt);

  var WAKANDA_SERVER_PATH = '<%= serverPath %>';
  var WAKANDA_SOLUTION_PATH = grunt.file.readJSON('.solution').path;
  var PROJECT_BASE_URL = 'http://localhost:8081';

  function escapeShellArg(arg) {
    ['\\', '$', '`'].forEach(function (char) {
      arg = arg.split(char).join('\\' + char);
    })
    return arg;
  }

  function getURL() {
    var path;

    if (grunt.option('catalog')) {
      path = '/rest/$catalog';
    } else if (grunt.option('class')) {
      path = '/rest/$catalog/' + grunt.option('class');
    } else if (grunt.option('data')) {
      path = '/rest/' + grunt.option('data');
    } else {
      path = '/';
    }
    return PROJECT_BASE_URL + escapeShellArg(path);
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    serve: {
      options: {
        server: WAKANDA_SERVER_PATH,
        solution: WAKANDA_SOLUTION_PATH,
        project: PROJECT_BASE_URL,
        debug: 'remote'
      }
    },
    open: {
      serve: {
        path: getURL,
        app: 'Google Chrome',
        options: {
          //openOn: 'serverListening'
        }
      }
    },
    reload: {

    }
  });

  grunt.loadNpmTasks('grunt-open');
  //grunt.loadNpmTasks('grunt-reload-chrome');

  // Default task(s).
  grunt.registerTask('default', ['serve']);

  // first version of wakanda "serve" task defined inline
  grunt.registerTask('serve', 'launch current solution on local wakanda server', function () {

    var done = this.async();

    var serverOptions = [];
    var options = grunt.config.data.serve.options;
    var openTaskArgs = ['open:serve'].concat(grunt.option.flags());

    // Launch the server
    if (['remote', 'wakanda', 'none'].indexOf(options.debug) === -1) {
        options.debug = 'remote';
    }

    //serverOptions.push('-g:' + options.debug);
    
    serverOptions.push(options.solution);
    
    grunt.util.spawn({
      cmd: options.server,
      args: serverOptions,
      opts: {stdio: 'inherit'}
    }, function (error, result, code) {
      done();
    });

    // Todo: inspect wakanda server stdout instead to know when server is ready
    setTimeout(function () {
      grunt.log.writeln('Running "open" task');
      grunt.log.writeln('args: ' + grunt.option.flags());
      // Only solution found ATM to prevent auto async/done
      grunt.util.spawn({
        cmd: 'grunt',
        args: openTaskArgs,
        opts: {
          stdout: function (data) {
            grunt.log.write('open' + data);
          }
        }
      }, function (error, result, code) {
      });
    }, 3500);

  });
};
