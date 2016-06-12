'use strict'

var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
browserify = require('browserify'), 
rename = require('gulp-rename'), 
sass = require('gulp-sass'),
maps = require('gulp-sourcemaps'),
source = require('vinyl-source-stream');


gulp.task('browserify', function(){
	return browserify('./js/app.js')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./'));

});


gulp.task("minifyJS", ["browserify"], function(){
	return gulp.src('bundle.js')
	.pipe(rename('bundle.min.js'))
	.pipe(gulp.dest('./'));
});


gulp.task('compileSass', function(){

	return gulp.src('scss/style.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'))

});

gulp.task("compileJS", ['browserify', 'minifyJS']);

gulp.task('watchSass', function(){
	gulp.watch(['scss/**/*.scss'], ['compileSass']);
});

gulp.task('watchJS', function(){
	gulp.watch(['js/*.js'], ['compileJS']);
});