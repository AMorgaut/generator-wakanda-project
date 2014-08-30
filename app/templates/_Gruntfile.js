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
    } else if (grunt.option('dataclass')) {
      path = '/rest/' + grunt.option('dataclass');
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
      'default': {
        path: getURL,
        app: 'Google Chrome'
      },
      serve: {
        path: getURL,
        app: 'Google Chrome',
        options: {
          openOn: 'serverListening'
        }
      },
      catalog: {
        path: 'http://localhost:8081/rest/\\$catalog/',,
        app: 'Google Chrome'
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

    // Launch the server
    if (['remote', 'wakanda', 'none'].indexOf(options.debug) === -1) {
        options.debug = 'remote';
    }

    //serverOptions.push('-g:' + options.debug);
    
    serverOptions.push(options.solution);
    
    timer = setTimeout(function () 
      grunt.log.writeln('Trying to run "open"');
      grunt.log.writeln('If the page doesn\'t open in the browser, run "grunt open:catalog" in another process');
      grunt.event.emit('serverListening'); // should be enough to run "open:serve"
      grunt.task.run(['open']); // try running manually "open --catalog" instead
      //task.async();
    }, 3500);
    
    grunt.util.spawn({
      cmd: options.server,
      args: serverOptions,
      opts: {stdio: 'inherit'}
    }, function (error, result, code) {
      done();
    });

  });
};
