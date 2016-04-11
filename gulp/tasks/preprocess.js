'use strict';

import gulp from 'gulp';
import preprocess   from 'gulp-preprocess';
import config       from '../config';

gulp.task('preprocess-example', function() {

    // preprocess env related settings
    const preprocessContext = config.preprocess[global.env];

    return gulp.src(config.preprocess.example.src)
        .pipe(preprocess({context: preprocessContext}))
        .pipe(gulp.dest(config.preprocess.example.dest));

});

gulp.task('preprocess', ['preprocess-example'], function() {

    // preprocess env related settings
    const preprocessContext = config.preprocess[global.env];

    return gulp.src(config.preprocess.src)
        .pipe(preprocess({context: preprocessContext}))
        .pipe(gulp.dest(config.preprocess.dest));

});
