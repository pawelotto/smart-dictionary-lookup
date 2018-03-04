const gulp = require('gulp')
const zip = require('gulp-zip')

/** Package the extension */
gulp.task("package", function() {
  console.log('Packaging the extension')
  gulp
    .src("src/**/*")
    .pipe(zip('smart-dictionary-lookup.zip'))
    .pipe(gulp.dest('web-ext-artifacts'))
})