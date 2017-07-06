const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const liveReload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-ruby-sass');

// Setup error reporting for js files
gulp.task('scripts', function () {
    return gulp.src('./*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(liveReload());
});

// Reload browser when ejs files change
gulp.task('ejs', function () {
    return gulp.src('views/*.ejs')
        .pipe(liveReload());
});

// Preprocess sass
gulp.task('styles', function () {
    return sass('public/stylesheets/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(liveReload());
});


gulp.task('watch', function () {
    liveReload.listen();
    gulp.watch('public/stylesheets/*.scss', ['styles']);
    gulp.watch('./*.js', ['scripts']);
    gulp.watch('views/*.ejs', ['ejs']);
});

gulp.task('server', function () {
    nodemon({
        'script': './bin/www'
    });
});

gulp.task('serve', ['server', 'watch']);  