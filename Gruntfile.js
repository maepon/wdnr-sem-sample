module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      options: {require: "bootstrap-sass"},
      dist: {
        options: {
          sassDir: "source/sass",
          cssDir: "asset/css",
          environment: "production"
        }
      },
      dev: {
        options: {
          sassDir: "source/sass",
          cssDir: "asset/css"
        }
      }
    },
    autoprefixer:{
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      default: {
        src: "asset/css/style.css",
        dest: "asset/css/style.css"
      }
    },
    cmq: {
      default: {
        src: "asset/css/style.css",
        dest: "asset/css/style.css"
      }
    },
    csscomb: {
      default: {
        src: "asset/css/style.css",
        dest: "asset/css/style.css"
      }
    },
    csso: {
      default: {
        src: "asset/css/style.css",
        dest: "asset/css/style.css"
      }
    },
    jshint: {
      options: {
        jshintrc: 'source/javascript/.jshintrc'
      },
      src: {
        src: ['source/javascript/*.js']
      }
    },
    concat: {
      jsdefault: {
        src: ["source/jslib/jquery-1.11.0.min.js","source/jslib/jquery.heightLine.js","source/javascript/*.js"],
        dest: "asset/js/sitescript.js"
      },
      license: {
        src: ["source/license/license.js","asset/js/sitescript.js"],
        dest: "asset/js/sitescript.js"
      }
    },
    uglify: {
      default: {
        src: ["source/jslib/jquery-1.11.0.min.js","source/jslib/jquery.heightLine.js","source/javascript/*.js"],
        dest: "asset/js/sitescript.js"
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd : "source/img/",
          src: "**/*.{png,jpg,gif}",
          dest: "asset/img/"
        }]
      }
    },
    connect: {
      uses_defaults: {}
    },
    watch: {
      options: {
        livereload: true
      },
      compassdev: {
        files: 'source/**/*.scss',
        tasks: ['compass:dev']
      },
      jsdev: {
        files: 'source/**/*.js',
        tasks: ['concat:jsdefault']
      },
      img: {
        files: 'source/**/*.{png,jpg,gif}',
        tasks: ['imagemin']
      },
      html: {
        files: '**/*.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect','watch']);
  grunt.registerTask('dev', ['compass:dev','concat:jsdefault','imagemin']);
  grunt.registerTask('dist', ['compass:dist','autoprefixer','cmq','csscomb','csso','jshint','uglify','concat:license','imagemin']);

};
