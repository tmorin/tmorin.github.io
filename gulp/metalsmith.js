var gulp = require('gulp');
var gulpsmith = require('gulpsmith');

var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');

var markdown = require('metalsmith-markdown');
var htmlMinifier = require("metalsmith-html-minifier");
var uglify = require('metalsmith-uglify');
var layouts = require('metalsmith-layouts');
var inPlace = require('metalsmith-in-place');
var paths = require('metalsmith-paths')

var Handlebars = require('handlebars');
Handlebars.registerHelper('isActive', function (name, options) {
    return name === options.data.root.path.name ? 'active' : '';
});
Handlebars.registerHelper('container', function (options) {
    if (options.data.root.skipContainer) {
        return options.fn(this);
    }
    return new Handlebars.SafeString('<div class="container">' + options.fn(this) + '</div>');
});

gulp.task('metalsmith', [], function () {
    return gulp
        .src([
            './src/pages/**/*'
        ])
        .pipe(gulp_front_matter()).on('data', function (file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(gulpsmith()
            .metadata({
                datas: require('../src/data')
            })
            .use(paths())
            .use(markdown())
            .use(layouts({
                engine: 'handlebars',
                directory: 'src/layouts',
                partials: 'src/partials',
                default: 'root.html'
            }))
            .use(inPlace({
                engine: 'handlebars',
                directory: 'src/layouts',
                partials: 'src/partials',
                default: 'root.html'
            }))
            .use(uglify())
            .use(htmlMinifier())
    ).pipe(gulp.dest('./dist'));
});
