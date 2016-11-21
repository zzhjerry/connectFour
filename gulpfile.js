var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var connect = require('gulp-connect');

var src = {
    html: 'app/*.html',
    scripts: './app/typescript/**/*.ts'
};

var dest = {
    js: 'dist/js'
};

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    });
});

gulp.task('ts', function () {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest(dest.js))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(src.scripts, ['ts']);
    gulp.watch(src.html, ['html']);
});

gulp.task('default', function () {
    runSequence('watch', 'connect');
});
