var tests = [], file;
for (file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/test\/spec\/.*\.spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

//YOU ABSOLUTELY NEED THE SLASH IN FRONT OF BASE OR ELSE YOU WILL GET TIMESTAMP ISSUES
var baseUrl = '/base/app';

require.config({
  baseUrl: baseUrl,
});

require([ 'require-config' ], function() {

  // ... then the karma-specific stuff
  require({
    baseUrl: baseUrl,
    paths: {
      'squire': '../node_modules/squirejs/src/Squire',
      'jsmock': '../node_modules/js-mock/dist/js-mock',
      'jshamcrest': '../node_modules/jshamcrest/jshamcrest'
    },
    shim: {
      'squire': {
        deps: [],
        exports: 'Squire'
      },
      'jsmock': {
        deps: [],
        exports: 'JsMock'
      },
      'jshamcrest': {
        deps: [],
        exports: 'JsHamcrest'
      },
    }
  });

  require([
    'lodash'
  ], function(_) {

    require(tests, function() {
      __karma__.start()
    });
  });
});