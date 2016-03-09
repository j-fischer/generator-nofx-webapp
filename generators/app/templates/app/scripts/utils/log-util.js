define([
  'jquery',
  'config',
  'log4javascript',
],
  /**
   * Utility module to provide helper functions for logging. Use this instead of log4javascript directly.
   * @module utils/log-util
   */
  function($, Config, Log4JS) {

    var _patternLayout = new Log4JS.PatternLayout("%d{HH:mm:ss,SSS} %-5p - %c - %m");
    var _consoleAppender = new Log4JS.BrowserConsoleAppender();
    var _queryParams = Config.getQueryParams();

    function getLogger(name) {
      var logger = Log4JS.getLogger(name || "app");

      logger.addAppender(_consoleAppender);

      if (_queryParams.popupAppender !== undefined) {
        var popupAppender = new Log4JS.PopUpAppender();
        popupAppender.setLayout(_patternLayout);

        logger.addAppender(popupAppender);
      }

      if (Config.isDebugMode()) {
        logger.setLevel(Log4JS.Level.TRACE);
      } else if (_queryParams.logLevel && Log4JS.Level[_queryParams.logLevel]) {
        logger.setLevel(Log4JS.Level[_queryParams.logLevel]);
      } else {
        logger.setLevel(Log4JS.Level.WARN);
      }

      return logger;
    }

    (function init() {
      _consoleAppender.setLayout(_patternLayout);
    })();

    return {
      /**
      * Creates a logger instances for the given name and configures it based on the available environment information.
      *
      * @returns {Log4Javascript.Logger} A logger instance for the given name.
      *
      * @function module:utils/log-util.getLogger
      */
      getLogger: getLogger,
    };
  }
);