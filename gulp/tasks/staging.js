'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('staging', ['clean'], function(cb) {

    cb = cb || function() {};

    global.isProd = true;
    global.env = 'staging';

    runSequence('browserify', 'gzip', 'preprocess', 'deploy', cb);

});
