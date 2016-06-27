const gulp = require('gulp');
const config = require('../config');
const pi = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
});

function compileScripts() {
    return gulp.src(`${config.src}/**/*.js`, {
        since: gulp.lastRun('compileScripts')
    })
    .pipe(pi.if(config.env !== 'production', pi.sourcemaps.init()))
    .pipe(pi.babel({
        presets: ['es2015'],
        plugins: [
            'transform-object-assign'
        ]
    }))
    .pipe(pi.if(config.env !== 'production', pi.sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest));
}

gulp.task(compileScripts);

gulp.task('scripts', compileScripts);
