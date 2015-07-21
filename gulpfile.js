var gulp = require('gulp');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');





gulp.task('javascript', function() {
    return gulp.src('client/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/build'));
});

gulp.task('watch', function () {
    gulp.watch(['client/app/**/*.js'],['javascript']);
});
