var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var connect = require('gulp-connect');
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");

var src = {
    html: 'app/*.html',
    assest: 'app/assest/**',
    scripts: './app/typescript/**/*.ts',
    entries: ['app/typescript/main.ts']
};

var targetDir = {
    js: 'dist/js',
    assest: 'dist/assest',
    root: 'dist'
};

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: src.entries,
})).plugin(tsify);

function bundle () {
    return watchedBrowserify
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('application.js'))
        .pipe(gulp.dest(targetDir.root))
        .pipe(connect.reload());
}

gulp.task('bundle', bundle);
// gulp.task('ts', function () {
//     return tsProject.src()
//         .pipe(tsProject()).js
//         .pipe(gulp.dest(dest.js))
//         .pipe(connect.reload());
// });

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(gulp.dest(targetDir.root))
        .pipe(connect.reload());
});

gulp.task('assest', function () {
    return gulp.src(src.assest)
        .pipe(gulp.dest(targetDir.assest))
        .pipe(connect.reload());
});

gulp.task('build', function () {
    runSequence('bundle', 'assest', 'html');
});

gulp.task('watch', function () {
    gulp.watch(src.assest, ['assest']);
    gulp.watch(src.html, ['html']);
});
watchedBrowserify.on('update', bundle);

gulp.task('default', function () {
    runSequence('build', 'watch', 'connect');
});
