'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber')
var concat = require('gulp-concat')
var livereload = require('gulp-livereload')
var runSeq = require('run-sequence')

gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('/styles/index.css').pipe(livereload());
});

gulp.task('buildCSS', function () {
	return gulp.src(__dirname + '/styles/scss/index.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(__dirname + '/styles/css'))
})

gulp.task('buildJS', function () {
	return gulp.src([__dirname + '/app/app.js', __dirname + '/app/*/*.js', __dirname + '/app/*/*/*.js'])
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(gulp.dest(__dirname + '/app'))
})

gulp.task('build', function () {
  runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('app/*/*.js', function () {
        runSeq('buildJS', 'reload');
    });

    gulp.watch('styles/scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

});
