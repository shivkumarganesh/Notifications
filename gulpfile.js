var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('lint', function() {
    gulp.src('./src/notifyme.js')
        .pipe(jscs())
        .on('error', gutil.noop)
        .pipe(stylish());
});


gulp.task('build', ['lint'], function() {
    gulp.src('./src/notifyme.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
    gulp.src('./src/vendor/**/*').pipe(gulp.dest('./dist/vendor/'));
    gulp.src('src/angular-notifyme.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['lint', 'build']);
});




gulp.task('default', ['lint', 'build', 'watch']);
