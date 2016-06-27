var gulp = require('gulp');
require('require-dir')('./gulp/tasks', {recurse: true});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'copy',
        'scripts'
    ),
    'jspm-builder'
));

gulp.task('dev-setup', gulp.series(
    'development',
    'default'
));
