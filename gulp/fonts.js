var gulp = require('gulp');

gulp.task('fonts', function () {
    return gulp.src([
            './node_modules/bootstrap/dist/fonts/**/*',
            './node_modules/font-awesome/fonts/**/*'
        ])
        .pipe(gulp.dest('./dist/fonts'));
});
