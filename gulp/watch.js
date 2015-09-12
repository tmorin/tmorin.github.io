var gulp = require('gulp');

gulp.task('watch', ['build'], function () {
    gulp.watch('src/styles/**/*.less', ['styles']);
    gulp.watch(['src/{layouts,pages,partials}/**/*'], ['metalsmith']);
    gulp.watch('public/**/*', ['public']);
});
