module.exports = function GruntfileModule(grunt) {

  var spawn = require('child_process').spawn;
  var fs = require('fs');

  require('load-grunt-tasks')(grunt);

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
      options: {
        serve: {
          path: getURL,
          app: 'Google Chrome'
        }
      }
    },
    reload: {

    }
  });

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload-chrome');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

  // first version of wakanda "serve" task defined inline
  grunt.registerTask('serve', 'launch current solution on local wakanda server', function () {

    var done = this.async();

    var serverOptions = [];
    var options = grunt.config.data.serve.options;
    var command;
    var url;
    var wakanda;


    // Launch the server
    if (['remote', 'wakanda', 'none'].indexOf(options.debug) === -1) {
        options.debug = 'remote';
    }

    serverOptions.push("--debugger:" + options.debug);

    serverOptions.push('"' + options.solution + '"');

    grunt.log.writeln('Started wakanda server on ' + PROJECT_BASE_URL);

    command = options.server;

    debugger;

    if (command.indexOf(' ') > -1) {
      fs.linkSync(command, process.cwd() + '/wakandaServer');
      command = process.cwd() + '/wakandaServer';
    }


    grunt.log.writeln(command, serverOptions);

    grunt.util.spawn({
      cmd: options.server,
      args: serverOptions,
      opts: {stdio: 'inherit'}
    });
    /*
    wakanda = spawn(
      command,
      serverOptions,
      {stdio: 'inherit'}
    );
    */

    //grunt.log.write('wakanda pid:', wakanda.pid);

    grunt.task.run([
      //'connect:livereload',
      //'watch',
      'open'
    ]);

    process.on('end', function () {
      wakanda.kill();
    })

  });
};
