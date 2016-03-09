require(['require-config'], function(){

  /**
   * This is the entrypoint of the application. It initializes the localization and logging,
   * and the starts the application by loading the {@link application} module.
   *
   * @module main
   */
  require([
    'jquery-extensions',
    'moment',
    'config',
    'i18next',
    'i18next-xhr-backend',
    'i18next-browser-languagedetector',
    'i18next-sprintf-postprocessor',
    'scripts/utils/log-util'
    ], function ($, moment, Config, I18next, I18nextXHR, I18nextLanguageDetector, I18nextSprintf, LogUtil) {

      var _logger = LogUtil.getLogger();

      function startApplication(i18nextInitializationError) {
        _logger.info("Localizations initialized");
        if (i18nextInitializationError) {
          _logger.error(i18nextInitializationError);
        }

        require([
          'scripts/application'],

          function (Application) {
            Application.run();
            _logger.info("App initialized");
          }
        );
      }

      I18next.on('languageChanged', function(lng) {
        moment.locale(lng);
      });

      I18next.
        use(I18nextXHR).
        use(I18nextLanguageDetector).
        use(I18nextSprintf).
        use({
          type: 'logger',
          log: function(args) { _logger.debug(JSON.stringify(args)); },
          warn: function(args) { _logger.warn(JSON.stringify(args)); },
          error: function(args) { _logger.error(JSON.stringify(args)); }
        }).
        init({
          debug: Config.isDebugMode(),
          fallbackLng: 'en',
          load: 'languageOnly',
          preload: ['en'],
          backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
          },
          detection: {
            order: ['querystring', 'navigator'],
            lookupQuerystring: 'lng'
          }
        }, startApplication);
    }
  );


});