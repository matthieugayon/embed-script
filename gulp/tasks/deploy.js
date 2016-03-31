'use strict';

import gulp   from 'gulp';
import awspublish from 'gulp-awspublish';

gulp.task('deploy', function() {

    let bucket = 'embed.viewsay.com';

    if (global.env === "staging") {
        bucket = 'embed-staging.viewsay.com';
    }

    const aws = {
        "key": "AKIAILU7O2X5ZUUVNE2Q",
        "secret": "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",
        "accessKeyId": 'AKIAILU7O2X5ZUUVNE2Q',
        "secretAccessKey": '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',
        "region": "us-east-1",
        "distributionId": "E1R6PQ7NOU0V",
        "params": {
            "Bucket" : bucket
        }
    };

    var publisher = awspublish.create(aws),
        headers = {'Cache-Control': 'max-age=60, no-transform, public'};

    return gulp.src('build/**')
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter());

});
