var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('zip:website', function () {
    return gulp.src([
        '**/*',
        '!{.idea,.git,dist,node_modules}/**/*',
        '!{.idea,.git,dist,node_modules}',
        '!{.project,ceb-website.zip}'
    ], {
        dot: true
    })
    .pipe(zip('ceb-website.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('zip', ['zip:website']);
