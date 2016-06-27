const gulp = require('gulp');
const config = require('../config');

const glob = `${config.src}/**/*.{html}`;

function copy() {
    return gulp.src(glob, {
        since: gulp.lastRun(copy)
    })
    .pipe(gulp.dest(config.dest));
}

gulp.task(copy);
