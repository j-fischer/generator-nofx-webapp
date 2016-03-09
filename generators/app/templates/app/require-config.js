require.config({
  baseUrl: '.',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'lodash': 'bower_components/lodash/dist/lodash',
    'text' : 'bower_components/requirejs-text/text',
    'handlebars': 'bower_components/handlebars/handlebars',
    'moment': 'bower_components/moment/min/moment-with-locales',
    'log4javascript': 'bower_components/log4javascript/js/log4javascript_uncompressed',
    'bootstrap': 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',

    'i18next': 'bower_components/i18next/i18next.min',
    'i18next-xhr-backend': 'bower_components/i18next-xhr-backend/i18nextXHRBackend.min',
    'i18next-sprintf-postprocessor': 'bower_components/i18next-sprintf-postprocessor/i18nextSprintfPostProcessor.min',
    'i18next-browser-languagedetector': 'bower_components/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min',

    'jquery-extensions': 'scripts/extensions/jquery-extensions',

    'templates': 'templates-generated', // Compiled Handlebars Templates
    'handlebars-helpers': 'scripts/extensions/handlebars-helpers',

    'config': 'config/config',
    'config-data': 'config/config-data'
  },
  shim:{
    'lodash': {
      deps: [],
      exports: '_'
    },
    'jquery':{
      deps:[],
      exports: '$'
    },
    'bootstrap': {
      deps:['jquery']
    },
    'log4javascript': {
      deps:[],
      exports: 'log4javascript'
    },
    'handlebars-helpers': {
      deps:['handlebars'],
      exports: 'Handlebars'
    },
  },

  waitSeconds: 20
});