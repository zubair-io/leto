var gulp = require('gulp');
//var ts = require('gulp-typescript');
//var tsProject = ts.createProject('tsconfig.json');

var inlineNg2Template = require('gulp-inline-ng2-template');
var PATH = {
  dest: './tmp/ts'
}
gulp.task('inlineTemplates', function () {

  var result = gulp.src('./src/**/*.ts')
    .pipe(inlineNg2Template({ base: '/src', useRelativePaths: true }))

  return result
    .pipe(gulp.dest(PATH.dest));
});

// gulp.task('copy_vendor_polyfils', function () {
//   gulp.src([
//     './src/vendor.ts',
//     './src/polyfills.ts'
//   ])
//     .pipe(gulp.dest(PATH.dest));
// });

gulp.task('default', ['inlineTemplates']);
