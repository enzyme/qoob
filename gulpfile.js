var gulp        = require('gulp')
var pump        = require('pump')
var uglify      = require('gulp-uglify')
var rename      = require("gulp-rename")
var rollup      = require('rollup').rollup
var rollupBabel = require('rollup-plugin-babel')

gulp.task("build", function (cb) {
  return rollup({
    entry: './src/qoob.js',
    plugins: [
      rollupBabel()
    ],
  }).then(function(bundle) {
    return bundle.write({
      format: 'umd',
      dest: './dist/qoob.js',
      moduleName: 'Qoob',
    })
  })
})

gulp.task('compress', ['build'], function (cb) {
  pump([
    gulp.src('dist/qoob.js'),
    uglify(),
    rename('qoob.min.js'),
    gulp.dest('dist')
  ], cb)
})

gulp.task('default', ['build', 'compress'])
