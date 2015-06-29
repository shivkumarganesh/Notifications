var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('compress', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['compress']);
});


gulp.task('default', ['compress']);
