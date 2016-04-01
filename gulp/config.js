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

  preprocess : {
    src: ['./build/*.js'],
    dest: 'build/',
    development : {
      commentpaneDomain : 'http://localhost:3012'
    },
    staging : {
      commentpaneDomain : 'https://commentpane-staging.viewsay.com'
    },
    production : {
      commentpaneDomain : 'https://commentpane.viewsay.com'
    }
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
