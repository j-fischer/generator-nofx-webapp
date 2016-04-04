(function(){

'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // configurable paths
  var config = {
      app: 'app',
      test: 'test',
      dist: 'artifacts/dist',

      artifacts: {
        build: 'artifacts/build',
        docs: 'artifacts/docs',
        reports: 'artifacts/reports',
        root: 'artifacts'
      }
  };

  grunt.initConfig({
      config: config,

      clean: {
        // Be careful about the paths you set in here. A simple typo could cause a reference to the root directory.
        // To simulated cleaning tasks, add: options: { 'no-write': true },
        build: ["<%= config.dist %>", "<%= config.artifacts.build %>"],
        docs: ["<%= config.artifacts.docs %>"],
        reports: ["<%= config.artifacts.reports %>"],
        bower: ["<%= config.app %>/bower_components"]
      },

      "bower-install-simple": {
        main: {
          options: {
            color: true,
            directory: "<%= config.app %>/bower_components"
          }
        }
      },

      jshint: {
          options: {
            jshintrc: ".jshintrc",
            reporter: require("jshint-stylish")
          },
          all: [
              'Gruntfile.js',
              '<%= config.app %>/scripts/**/*.js',
              '<%= config.test %>/spec/{,*/}*.js'
          ]
      },

      csslint: {
        all: {
          options: {
            import: false,
            ids: false,
            'universal-selector': false
          },
          src: [
            '<%= config.app %>/styles/**/*.css',
            '<%= config.app %>/styles/**/*.scss'
          ]
        }
      },

      jsdoc : {
        dist : {
          options: {
            configure: './.jsdoc',
            destination: '<%= config.artifacts.docs %>',
            template: './node_modules/jsdoc-oblivion/template'
          },
          // Note: A markup file can be added as the index page for the documentation.
          src: ['<%= config.app %>/*.js', '<%= config.app %>/scripts/**/*.js', '<%= config.app %>/config/*.js']
        }
      },

      plato: {
        report: {
          files: {
            // For a historic trend, choose destination outside of artifacts folder.
            '<%= config.artifacts.reports %>/plato': ['<%= config.app %>/main.js', '<%= config.app %>/scripts/**/*.js', '<%= config.app %>/config/*.js']
          }
        }
      },

      todo: {
        options: {
          file: "<%= config.artifacts.reports %>/todo/todo.md",
          marks: [
            {
              name: "FIXME",
              pattern: /FIXME/,
              color: "red"
            },
            {
              name: "HACK",
              pattern: /HACK/,
              color: "red"
            },
            {
              name: "TODO",
              pattern: /TODO/,
              color: "yellow"
            }
          ]
        },
        all: [
          '<%= config.app %>/index.html',
          '<%= config.app %>/*.js',
          '<%= config.app %>/config/*.js',
          '<%= config.app %>/sripts/**/*.js',
          '<%= config.app %>/templates/**/*.hbs',
          '<%= config.test %>/**/*.js'
        ]
      },

      copy: {
        stageScripts: {
          expand: true,
          cwd: '<%= config.app %>',
          src: ['config/**', 'scripts/**', '*.js', 'bower_components/**/*.js'],
          dest: '<%= config.artifacts.build %>',
          flatten: false
        },
        stageConfigProd: {
          expand: false,
          src: '<%= config.app %>/config/config-data-prod.js',
          dest: '<%= config.artifacts.build %>/config/config-data.js',
          flatten: false
        },
        distStyles: {
          expand: false,
          src: '<%= config.app %>/styles/style.css',
          dest: '<%= config.dist %>/styles/style.css',
          flatten: false
        },
        distLocales: {
          expand: true,
          cwd: '<%= config.app %>',
          src: ['locales/**/*.json'],
          dest: '<%= config.dist %>',
          flatten: false
        },
        distIndex: {
          src: '<%= config.app %>/index.html',
          dest: '<%= config.dist %>/index.html',
          options: {
            process: function (content, srcpath) {
              return content
                .replace('<script src="bower_components/requirejs/require.js"></script>','');
            },
          }
        }
      },

      sass: {
        dist: {
          options: {
            loadPath: [
            "<%= config.app %>/bower_components/bootstrap-sass-official/assets/stylesheets",
            "<%= config.app %>/styles"
            ],
            style: 'compressed'
          },
          files: {
            '<%= config.app %>/styles/style.css': '<%= config.app %>/styles/style.scss'
          }
        }
      },

      handlebars: {
        options: {
          amd: ['handlebars', 'handlebars-helpers'],
          processName: function(filePath) {
            return filePath.replace(/^app\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
        all: {
          files: {
            "<%= config.app %>/templates-generated.js": ["<%= config.app %>/templates/**/*.hbs"]
          }
        }
      },

      requirejs: {
        options: {
          name: 'bower_components/almond/almond',
          baseUrl: '<%= config.artifacts.build %>',
          out: '<%= config.dist %>/main.js',
          mainConfigFile: '<%= config.artifacts.build %>/require-config.js',
          include: ['main'],

          optimizeAllPluginResources : true,
          findNestedDependencies : true,
          wrap: false,

          uglify2: {
            output: {
              semicolons: false
            }
          }
        },
        debug: {
          options : {
            optimize: 'none'
          }
        },
        prod: {
          options: {
            optimize: 'uglify2',

            paths: {
              'handlebars': 'bower_components/handlebars/handlebars.runtime',
            }
          }
        }
      },

      karma: {
        options: {
          configFile: 'karma.conf.js',

          // list of files / patterns to load in the browser
          files: [
            {pattern: '<%= config.app %>/bower_components/**/*.js', included: false },
            {pattern: '<%= config.app %>/lib/**/*.js', included: false },
            {pattern: '<%= config.app %>/*.js', included: false },
            {pattern: '<%= config.app %>/scripts/**/*.js', included: false },
            {pattern: '<%= config.test %>/spec/**/*.spec.js', included: false },

            {pattern: 'node_modules/squirejs/src/*.js', included: false },
            {pattern: 'node_modules/js-mock/dist/*.js', included: false },
            {pattern: 'node_modules/jshamcrest/**/*.js', included: false },

            '<%= config.test %>/karma.main.js'
          ],

          // list of files to exclude
          exclude: [
            '<%= config.app %>/main.js'
          ],

          // For code coverage reporting
          preprocessors: {
            '<%= config.app %>/scripts/**/*.js': 'coverage'
          },

          coverageReporter: {
            reporters: [
              {
                type : 'html',
                dir:'<%= config.artifacts.reports %>/coverage/unit/html'
              },
              {
                type : 'cobertura',
                dir : '<%= config.artifacts.reports %>/coverage/unit/xml',
                file: 'cobertura-coverage.xml'
              },
              {
                type: 'text-summary'
              }
            ]
          },

          junitReporter: {
            outputDir: '<%= config.artifacts.reports %>/junit', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'test-results.xml',
            useBrowserName: false
          }
        },
        unit: {
          singleRun: true,
          browsers: ['PhantomJS']
        },
        watch: {
          browsers: ['PhantomJS']
        },
        debug: {
          configFile: 'karma.conf.js',
          browsers: ['Chrome']
        }
      },

      hashres: {
        options: {
          fileNameFormat: '${name}.${hash}.${ext}'
        },
        dist: {
          src: [
            '<%= config.dist %>/*.js',
            '<%= config.dist %>/scripts/*.js',
            '<%= config.dist %>/styles/*.css'
          ],
          dest: ['<%= config.dist %>/index.html']
        }
      },

      connect: {
        options: {
          port: 9000,
          open: true,
          livereload: true,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
        },
        livereload: {
          options: {
            base: '<%= config.app %>'
          }
        },
        dist: {
          options: {
            base: '<%= config.dist %>',
            livereload: false
          }
        }
      },

      watch: {
        css: {
          files : ['<%= config.app %>/**/*.css', '<%= config.app %>/**/*.scss'],
          tasks : ['sass']
        },

        hbs: {
          files : ['<%= config.app %>/templates/**/*.hbs'],
          tasks : ['handlebars']
        },

        js: {
          options: {
            livereload: true
          },
          files: ['Gruntfile.js', '<%= config.app %>/**/*.js'],
          tasks: ['jshint']
        },

        livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              '<%= config.app %>/*.html',
              '<%= config.app %>/**/*.css',
              '<%= config.app %>/images/{,*/}*'
          ]
        }
      },

      concurrent: {
        server: [
          'handlebars',
          'sass'
        ]
      }
    });

    /*
     * Install Bower components
     */
    grunt.registerTask("bower-install", [ "bower-install-simple" ]);

    /*
     * Code Verification
     */
    grunt.registerTask('lint', ['jshint']);

    /*
     * CSS Packaging
     */
    grunt.registerTask('css', ['sass']);

    /*
     * Unit testing
     */
    grunt.registerTask('test', "Runs the unit tests; available options: --watch or --chrome", function() {
      grunt.task.run("clean:reports");

      if (grunt.option("watch")) {
        return grunt.task.run("karma:watch");
      }

      if (grunt.option("chrome")) {
        return grunt.task.run("karma:debug");
      }

      grunt.task.run("karma:unit");
    });

    /*
     * Build
     */
    grunt.registerTask('build', 'Create the final resources for production',
      function (target) {
        var tasks = ['clean:build', 'handlebars', 'lint'];

        // copy is required by requirejs
        tasks.push('copy');

        if (target === 'debug') {
          tasks.push('requirejs:debug');
        } else {
          tasks.push('requirejs:prod');
        }

        tasks.push('css');
        tasks.push('hashres');


        grunt.task.run(tasks);
      }
    );

    /*
     * Run the application in a local server for development. Use --dist to test final build.
     */
    grunt.registerTask('server', 'start the server and preview your app, --allow-remote for remote access',
      function () {
        if (grunt.option('allow-remote')) {
          grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (grunt.option("dist")) {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'concurrent:server',
          'connect:livereload',
          'watch'
        ]);
      }
    );

    /*
     * Creates all reports.
     */
    grunt.registerTask('reports', ['clean:docs', 'test', 'jsdoc', 'plato', 'todo']);

    /*
     * Setup default task that runs when you just run 'grunt'
     */
    grunt.registerTask('default', ['bower-install', 'build', 'reports']);
  };
}());
