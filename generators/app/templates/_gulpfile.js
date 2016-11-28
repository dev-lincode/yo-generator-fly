var gulp = require('gulp'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  php = require('gulp-connect-php'),
  browserSync = require('browser-sync'),
  sourcemaps = require('gulp-sourcemaps');

var sourcePath = 'assets/src/';
var destPath = 'assets/';

gulp.task('css', function(){
  gulp.src( sourcePath + 'less/css/style.less' )
    .pipe(sourcemaps.init())
    .pipe( less() )
    .pipe( minifyCSS() )
    .pipe(sourcemaps.write())
    .pipe(rename( "style.min.css" ))
    .pipe(gulp.dest( destPath + 'css' ))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  gulp.src( sourcePath + 'js/scripts.js' )
    .pipe(uglify())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest( destPath + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch([ sourcePath + '/less/css/**/*.less'], ['css']);
    gulp.watch([ sourcePath + 'js/**/*.js'], ['js']);
});

gulp.task('php', function() {
  php.server({ base: 'project-name', port: 80, keepalive: true});
});

gulp.task('browser-sync',['php'], function() {
  browserSync({
    proxy: '127.0.0.1/project-name',
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watch-dev', ['browser-sync'], function () {
  gulp.watch(destPath + 'css/style.min.css').on('change', function () {browserSync.reload();});
  gulp.watch(destPath + 'js/scripts.min.js').on('change', function () {browserSync.reload();});
  gulp.watch('**/*.php').on('change', function () {browserSync.reload();});
});

gulp.task('build', ['css', 'js']);
gulp.task('default', ['build', 'watch']);
gulp.task('dev', ['build', 'watch', 'watch-dev']);
