/*jshint strict:false */

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var gp = require('auto-plug')('gulp');

gulp.task('jshint', function () {
    return gulp.src(['public/scripts/**/*', '!public/scripts/vendors**/*'])
        .pipe(gp.jshint())
        .pipe(gp.jshint.reporter('jshint-stylish'))
        .pipe(gp.jshint.reporter('fail'));
});

/* CLEAN */

gulp.task('clean:tmp', function (cb) {
    del(['tmp'], cb);
});
gulp.task('clean:dist', function (cb) {
    del(['dist'], cb);
});
gulp.task('clean', ['clean:tmp', 'clean:dist']);

/* PREPARE */

gulp.task('prepare-styles', function () {
    return gulp.src(['public/styles/main.less'])
        .pipe(gp.less())
        .pipe(gp.autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('tmp/styles'));
});
gulp.task('prepare-fonts', function () {
    return gulp.src(['node_modules/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('tmp/fonts'));
});
gulp.task('prepare-scripts', ['jshint'], function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'public/scripts/**/*.js'
        ])
        .pipe(gp.concat('main.js'))
        .pipe(gulp.dest('tmp/scripts'));
});
gulp.task('prepare', function (cb) {
    runSequence(
        'clean:tmp', ['prepare-styles', 'prepare-fonts', 'prepare-scripts'],
        cb
    );
});

/* COPY */

gulp.task('dist-public', [], function () {
    return gulp.src([
            'public/**/*',
            '!public/styles/**/*',
            '!public/scripts/**/*'
        ])
        .pipe(gulp.dest('dist'));
});
gulp.task('dist-tmp', ['prepare'], function () {
    return gulp.src(['tmp/**/*', '!tmp/scripts/*', '!tmp/styles/*'])
        .pipe(gulp.dest('dist'));
});
gulp.task('dist-styles', ['prepare'], function () {
    return gulp.src(['tmp/styles/**/*'])
        .pipe(gp.minifyCss())
        .pipe(gulp.dest('dist/styles'));
});
gulp.task('dist-scripts', ['prepare'], function () {
    return gulp.src(['tmp/scripts/**/*'])
        .pipe(gp.uglify())
        .pipe(gulp.dest('dist/scripts'));
});
gulp.task('dist', function (cb) {
    runSequence(
        'clean', ['dist-public', 'dist-tmp', 'dist-styles', 'dist-scripts'],
        cb
    );
});

gulp.task('deploy', ['dist'], function () {
    return gulp.src('dist/**/*')
        .pipe(gp.ghPages({
            branch: 'master'
        }));
});

gulp.task('serve-dist', ['dist'], function () {
    return gp.connect.server({
        port: 9090,
        root: ['dist']
    });
});

/* SERVE */

gulp.task('reload-html', function () {
    gulp.src('public/**/*.html').pipe(gp.connect.reload());
});
gulp.task('reload-styles', ['prepare-styles'], function () {
    gulp.src('tmp/styles/**/*.css').pipe(gp.connect.reload());
});
gulp.task('reload-scripts', ['prepare-scripts'], function () {
    gulp.src('tmp/scripts/**/*.js').pipe(gp.connect.reload());
});
gulp.task('watch', function () {
    gulp.watch(['public/**/*.html'], ['reload-html']);
    gulp.watch(['public/**/*.less'], ['reload-styles']);
    gulp.watch(['public/**/*.js'], ['reload-scripts']);
});
gulp.task('serve', ['prepare', 'watch'], function () {
    return gp.connect.server({
        port: 8080,
        root: ['tmp', 'public'],
        livereload: true
    });
});
