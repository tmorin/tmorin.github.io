var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['watch'], function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./dist/**.*').on('change', browserSync.reload);
});
