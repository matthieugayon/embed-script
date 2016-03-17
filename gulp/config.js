'use strict';

export default {
  serverPort: 4012,

  sourceDir: './src/',
  buildDir: './build/',

  scripts: {
    src: 'src/**/*.js',
    dest: 'build'
  },

  gzip: {
    src: 'build/**/*.{js}',
    dest: 'build/',
    options: {}
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  }
};
