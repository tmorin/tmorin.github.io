var gulp = require('gulp');
var sitemap = require('gulp-sitemap');

gulp.task('sitemap', function () {
    gulp.src('./dist/**/*.html')
        .pipe(sitemap({
            siteUrl: 'http://tmorin.github.io/'
        }))
        .pipe(gulp.dest('./dist'));
});
