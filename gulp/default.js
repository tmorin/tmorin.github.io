var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', [], function (cb) {
    del([
        './dist',
        './.publish',
        './ceb-website.zip'
    ], cb);
});

gulp.task('build', ['metalsmith', 'styles', 'scripts', 'fonts', 'public'], function (done) {
    return runSequence(['sitemap'], done);
});

gulp.task('default', ['clean'], function (done) {
    return runSequence(['build'], done);
});
