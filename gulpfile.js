var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var jscs = require('gulp-jscs');


gulp.task('compress', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jscs().on('error', gutil.log))
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['lint', 'compress']);
});


gulp.task('default', ['lint', 'compress', 'watch']);
