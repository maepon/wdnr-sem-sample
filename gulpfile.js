var gulp = require('gulp'),
    cmq = require('gulp-combine-media-queries'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    comb = require('gulp-csscomb'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin');

gulp.task('cssdev',function(){
  gulp.src('source/sass/*.scss')
      .pipe(compass({
        require: 'bootstrap-sass',
        css: 'asset/css',
        sass: 'source/sass'
      }))
      .pipe(gulp.dest('asset/css'));
});

gulp.task('cssdist',function(){
  gulp.src('source/sass/*.scss')
      .pipe(compass({
        require: 'bootstrap-sass',
        css: 'asset/css',
        sass: 'source/sass',
        environment: 'production'
      }))
      .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
      .pipe(cmq())
      .pipe(comb())
      .pipe(csso())
      .pipe(gulp.dest('asset/css'));
});

gulp.task('jsdev',function(){
  gulp.src(['source/jslib/jquery-1.11.0.min.js','source/jslib/jquery.heightLine.js','source/javascript/*.js'])
    .pipe(concat('sitescript.js'))
    .pipe(gulp.dest('asset/js'));
});

gulp.task('jshint',function(){
  gulp.src('source/javascript/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('license',function(){
  gulp.src(['source/license/license.js','asset/js/sitescript.js'])
      .pipe(concat('sitescript.js'))
      .pipe(gulp.dest('asset/js'));
});

gulp.task('jsdist',function(){
  gulp.run('jshint');
  gulp.src(['source/jslib/jquery-1.11.0.min.js','source/jslib/jquery.heightLine.js','source/javascript/*.js'])
      .pipe(concat('sitescript.js'))
      .pipe(uglify())
      .pipe(gulp.dest('asset/js'));
  gulp.run('license');
});

gulp.task('imagemin',function(){
  gulp.src('source/img/**/*.{png,jpg,gif}')
      .pipe(imagemin())
      .pipe(gulp.dest('asset/img'));
});

gulp.task('dev',function(){
  gulp.run('cssdev','jsdev','imagemin');
});

gulp.task('dist',function(){
  gulp.run('cssdist','jsdist','imagemin');
});

gulp.task('html',function(){
    gulp.src(['**/*.html','!./node_modules/**'])
        .pipe(connect.reload());
});

gulp.task('connect', connect.server({
  port: 8080,
  root: [process.env['PWD']],
  livereload: true
}));

gulp.task('watch',function(){
  gulp.watch('source/sass/*.scss',function(){
    gulp.run('cssdev');
  });
  gulp.watch('source/javascript/*.js',function(){
    gulp.run('jsdev');
  });
  gulp.watch('source/img/**/*.{png,jpg,gif}',function(){
    gulp.run('imagemin');
  });
  gulp.watch('**/*.html',function(event){
    gulp.src(event.path).pipe(connect.reload());
  });
  gulp.watch('asset/css/*.css',function(event){
    gulp.src(event.path).pipe(connect.reload());
  });
  gulp.watch('asset/js/*.js',function(event){
    gulp.src(event.path).pipe(connect.reload());
  });
  gulp.watch('asset/img/**/*.{png,jpg,gif}',function(event){
    gulp.src(event.path).pipe(connect.reload());
  });
});

gulp.task('default',function(){
  gulp.run('connect','dev','watch');
});
