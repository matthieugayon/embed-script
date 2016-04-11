'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import rename       from 'gulp-rename';
import runSequence  from 'run-sequence';
import handleErrors from '../util/handleErrors';

function createSourcemap() {
  return !global.isProd || config.browserify.prodSourcemap;
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  let bundler = browserify({
    entries: [config.sourceDir + file],
    debug: createSourcemap(),
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  if ( !global.isProd ) {
    bundler = watchify(bundler);

    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundle...');
    });

    bundler.on('log', function () {
      // re run preprocess task after rebundling
      runSequence('preprocess');
    });
  }

  bundler.transform(babelify, {});

  function rebundle() {
    const stream = bundler.bundle();
    const sourceMapLocation = global.isProd ? './' : '';

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap(), buffer()))
      .pipe(gulpif(createSourcemap(), sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: { drop_console: true }
      }))))
      .pipe(gulpif(createSourcemap(), sourcemaps.write(sourceMapLocation)))
      .pipe(rename('viewsayIframeApi.js'))
      .pipe(gulp.dest(config.scripts.dest));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});
