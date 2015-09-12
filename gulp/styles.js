var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleanCss = new LessPluginCleanCSS({
    advanced: true
});
var autoPrefix = new LessPluginAutoPrefix({
    browsers: ['last 2 versions']
});
var lessPlugins = [autoPrefix, cleanCss];

gulp.task('styles', [], function () {
    return gulp.src('./src/styles/**/*.less')
        .pipe(plumber())
        .pipe(less({
            plugins: lessPlugins,
            paths: ['.']
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/styles'));
});
