var gulp = require('gulp'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css');

var sourcePath = 'assets/src/';
var destPath = 'assets/';
var bootstrapPath = sourcePath + 'less/bootstrap/';

gulp.task('css', function(){
	gulp.src( sourcePath + 'less/css/style.less' )
	  .pipe( less() )
	  .pipe(gulp.dest( destPath + 'css') )
	  .pipe( minifyCSS() )
	  .pipe(rename( "style.min.css" ))
	  .pipe(gulp.dest( destPath + 'css' ));
});

gulp.task('bootstrap', function(){
	gulp.src( bootstrapPath + 'bootstrap.less' )
	  .pipe(less())
	  .pipe(gulp.dest( destPath + 'css' ))
	  .pipe(minifyCSS())
	  .pipe(rename( "bootstrap.min.css" ))
	  .pipe(gulp.dest( destPath + 'css' ));
});

gulp.task('js', function(){
	gulp.src( sourcePath + 'js/scripts.js' )
		.pipe(uglify())
		.pipe(rename("scripts.min.js"))
		.pipe(gulp.dest( destPath + 'js'));
});

gulp.task('watch', function () {
    gulp.watch([ sourcePath + '/less/css/**/*.less'], ['css']);
    gulp.watch([ sourcePath + 'js/**/*.js'], ['js']);
});

gulp.task('build', ['css', 'bootstrap', 'js']);
gulp.task('default', ['build', 'watch']);
