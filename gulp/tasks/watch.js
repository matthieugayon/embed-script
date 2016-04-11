'use strict';

import config from '../config';
import gulp   from 'gulp';

gulp.task('watch', ['server'], function() {

  global.isWatching = true;

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task

  //TODO re include here lint and lint the whole project
  gulp.watch(config.scripts.src, ['preprocess']);

});
