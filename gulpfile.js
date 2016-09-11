var gulp = require('gulp');
var inlineNg2Template = require('gulp-inline-ng2-template');
var PATH = {
  dest: './tmp/ts'
}
gulp.task('inlineTemplates', function () {
  var result = gulp.src([
    './src/**/*.ts',
    '!./src/electron.ts',
    '!./src/server*.ts',
    '!./src/main.node.ts'
  ])
    .pipe(inlineNg2Template({ base: '/src', useRelativePaths: true }))

  return result
    .pipe(gulp.dest(PATH.dest));
});

gulp.task('default', ['inlineTemplates']);
