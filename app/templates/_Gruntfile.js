module.exports = function GruntfileModule(grunt) {

  var spawn = require('child_process').spawn;
  var fs = require('fs');

  //require('load-grunt-tasks')(grunt);

  var WAKANDA_SERVER_PATH = '<%= serverPath %>';
  var WAKANDA_SOLUTION_PATH = grunt.file.readJSON('.solution').path;
  var PROJECT_BASE_URL = 'http://localhost:8081';

  function getURL() {
    var path;

    if (grunt.options('catalog')) {
      path = '/rest/$catalog';
    } else {
      path = '/';
    }
    return PROJECT_BASE_URL + path;
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
        path: 'http://localhost:8081/rest/%24catalog/',
        app: 'Google Chrome',
        options: {
          openOn: 'serverListening'
        }
      },
      catalog: {
        path: 'http://localhost:8081/rest/%24catalog',
        app: 'Google Chrome',
        options: {}
      }
    },
    reload: {

    }
  });

  grunt.loadNpmTasks('grunt-open');
  //grunt.loadNpmTasks('grunt-reload-chrome');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

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
    
    
    timer = setTimeout(function () {
        grunt.log.writeln('run open');
        grunt.event.emit('serverListening');
        grunt.task.run(['open:catalog']);
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
