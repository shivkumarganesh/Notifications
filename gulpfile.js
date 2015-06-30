var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');


gulp.task('compress', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jscs())
        .on('error', gutil.noop)
        .pipe(stylish())
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['lint', 'compress']);
});


gulp.task('default', ['lint', 'compress', 'watch']);
