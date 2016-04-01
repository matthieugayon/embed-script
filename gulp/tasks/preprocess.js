'use strict';

import gulp from 'gulp';
import preprocess   from 'gulp-preprocess';
import config       from '../config';

gulp.task('preprocess', function() {

    // preprocess env related settings
    const preprocessContext = config.preprocess[global.env];

    return gulp.src(config.preprocess.src)
        .pipe(preprocess({context: preprocessContext}))
        .pipe(gulp.dest(config.preprocess.dest));

});