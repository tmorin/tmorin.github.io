var gulp = require('gulp');

gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery/dist/jquery.min.{js,map}',
        'src/scripts/**/*.js'
    ]).pipe(gulp.dest('./dist/scripts'));
});
