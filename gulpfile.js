const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const clean = require('gulp-clean');
const strip = require('gulp-strip-comments');

gulp.task('clean', () => {
    return gulp
        .src('build', {
            read: false,
        })
        .pipe(clean());
});

gulp.task('compile:server', () => {
    return gulp.src([
            './server/**/*.js',
        ])
        .pipe(strip())
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('./build/server'));
});

gulp.task('compile:public', () => {
    return gulp.src([
            './public/js/**/*.js',
        ])
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('./build/public/js'));
});

gulp.task('compile:sass', () => {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./build/public/css'));
});

gulp.task('compile', ['compile:server', 'compile:public', 'compile:sass']);

gulp.task('copy:app', () => {
    return gulp
        .src([
            './app/**/*.js',
        ])
        .pipe(strip())
        .pipe(gulp.dest('./build/app'));
});

gulp.task('copy:fonts', () => {
    return gulp
        .src('./public/fonts/**/*.*')
        .pipe(gulp.dest('./build/public/fonts'));
});

gulp.task('copy:images', () => {
    return gulp
        .src([
            './public/images/**/*.{png,svg,jpg}',
            './public/images/posts/**/*.jpg',
            './public/images/users/**/*.jpg',
        ])
        .pipe(gulp.dest('./build/public/images'));
});

gulp.task('copy:css', () => {
    return gulp
        .src([
            './public/css/bootstrap.min.css',
            './public/css/jquery.bs_pagination.min.css',
        ])
        .pipe(gulp.dest('./build/public/css'));
});

gulp.task('copy:templates', () => {
    return gulp
        .src('./public/templates/**/*.handlebars')
        .pipe(gulp.dest('./build/public/templates'));
});

gulp.task('copy', ['copy:app', 'copy:fonts', 'copy:images', 'copy:css', 'copy:templates']);

gulp.task('build', gulpsync.sync(['clean', 'compile', 'copy']));

gulp.task('serve', ['build'], () => {
    nodemon({
        script: './build/server/server.js',
        ext: 'js html css scss',
        ignore: ['build'],
        tasks: ['build'],
    });
});
