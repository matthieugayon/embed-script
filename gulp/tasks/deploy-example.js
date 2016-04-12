'use strict';

import gulp   from 'gulp';
import RevAll from 'gulp-rev-all';
import awspublish from 'gulp-awspublish';
import cloudfront from 'gulp-cloudfront';
import runSequence  from 'run-sequence';

gulp.task('deploy-example', ['clean'], function(cb) {

    cb = cb || function() {};

    global.isProd = true;
    global.env = 'staging';

    runSequence('browserify', 'gzip', 'preprocess', 'deploy-example-aws', cb);
});

gulp.task('deploy-example-aws', function() {

    let bucket = 'example-partner-staging-viewsay',
        distributionId = "E3EOMUL56KH5LD";

    const aws = {
        "key": "AKIAILU7O2X5ZUUVNE2Q",
        "secret": "+vs+wRc/E2jlP1H6WnH1xmTo3cNT8r77xjL3mE+u",
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

    return gulp.src(['example/**','!example/src/**'])
        .pipe(revAll.revision())
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter({
            states: ['create', 'update', 'delete']
        }))
        .pipe(cloudfront(aws));
});
