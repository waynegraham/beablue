/*!
 * Beablue.org's Gruntfile
 * http://beablue.org
 */

module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var paths = {
    js:     './assets/js/vendor/',
    images: './images',
    sass:   './sass/**/*',
    css:    './css'
  };

  grunt.initConfig({

    clean: {
      dist: 'dist'
    },

    // watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      options: {
        livereload: true
      },
      compass: {
        files: [paths.sass],
        tasks: ['compass']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        files: ['*.html', paths.css + '/*.css', 'views/*.erb', 'public/styles.css', '/public/js/**/*.js', '*.rb', paths.images + '/**/*.{png,jpg,jpeg,gif,webp,svg}']
      }
    },

    // compass and scss
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    // javascript linting with jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        "force": true
      },
      all: [
        'Gruntfile.js',
        paths.js + '/source/**/*.js'
      ]
    },

    // uglify to concat, minify, and make source maps
    uglify: {
      dist: {
        options: {
          sourceMap: 'public/js/map/source-map.js'
        },
        files: {
          'public/js/main.min.js': [
            'assets/js/source/plugins.js',
            'assets/js/vendor/**/*.js',
            '!assets/js/vendor/modernizr/**/*.js',
            '!assets/js/vendor/jquery/**/*.js'
          ]
        }
      }
    },
    // image optimization
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: paths.images,
          src: '**/*',
          dest: paths.images
        }]
      }
    },

    modernizr: {
      dist: {
        "devFile": "assets/js/vendor/modernizr/modernizr.js",
        "outputFile": "js/modernizr-custom.js",
        "extra" : {
          "shiv": true,
          "printshiv": false,
          "load": true,
          "mq": false,
          "cssclasses" : true
        },
        "extensibility" : {
          "addtest": false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false
        },
        "uglify": true,
        "parseFiles": true,
        "matchCommunityTests": false
      }
    }


  });


  // register task
  grunt.registerTask('default', ['watch']);

};
