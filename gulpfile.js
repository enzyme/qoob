var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require("gulp-babel");

gulp.task("build", function (cb) {
    pump([
        gulp.src("src/qoob.js"),
        babel(),
        gulp.dest("build")
    ], cb);
});

gulp.task('compress', ['build'], function (cb) {
    pump([
        gulp.src('build/*.js'),
        uglify(),
        gulp.dest('dist')
    ], cb);
});

gulp.task('default', ['build', 'compress']);
