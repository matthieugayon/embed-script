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
    example : {
      src: ['./example/src/*.html'],
      dest: 'example/',
    },
    development : {
      commentpaneDomain : 'http://localhost:3012'
    },
    staging : {
      commentpaneDomain : 'https://partner-staging.viewsay.com'
    },
    production : {
      commentpaneDomain : 'https://partner.viewsay.com'
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
