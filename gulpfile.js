var gulp = require('gulp');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');





gulp.task('javascript', function() {
    return gulp.src('client/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/dist'));
});

gulp.task('watchjs', function () {
    watch('client/app/**/*.js', function () {
        return gulp.src('client/app/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('client/dist'));
    });
});
