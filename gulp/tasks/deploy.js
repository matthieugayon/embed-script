'use strict';

import gulp   from 'gulp';
import RevAll from 'gulp-rev-all';
import awspublish from 'gulp-awspublish';
import cloudfront from 'gulp-cloudfront';

gulp.task('deploy', function() {

    let bucket = 'embed-viewsay',
        distributionId = "E1A0KLTDNUDEVM";

    if (global.env === "staging") {
        bucket = 'embed-staging-viewsay';
        distributionId = "E3V4HELJ0ILRJN";
    }

    const aws = {
        "key": "AKIAILU7O2X5ZUUVNE2Q",
        "secret": "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",
        "accessKeyId": 'AKIAILU7O2X5ZUUVNE2Q',
        "secretAccessKey": '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',
        "region": "us-east-1",
        "distributionId": distributionId,
        "params": {
            "Bucket" : bucket
        }
    };

    var publisher = awspublish.create(aws),
        headers = {'Cache-Control': 'max-age=60, no-transform, public'},
        revAll = new RevAll({
            dontRenameFile: ['.png','.jpg'],
            dontUpdateReference : ['.png','.jpg']
        });

    return gulp.src('build/**')
        .pipe(revAll.revision())
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter({
            states: ['create', 'update', 'delete']
        }))
        .pipe(cloudfront(aws));
});
