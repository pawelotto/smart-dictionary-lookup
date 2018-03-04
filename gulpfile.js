const gulp = require('gulp')
const zip = require('gulp-zip')

/** Package the extension */
gulp.task("package", function() {
  console.log('Packaging the extension')
  gulp
    .src("src/**/*")
    .pipe(zip('dictionary-lookup.zip'))
    .pipe(gulp.dest('dist'))
})