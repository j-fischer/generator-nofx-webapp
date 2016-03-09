define(['jquery', 'config-data'],
  /**
   * Utility module to provide helper functions for logging. Use this instead of log4javascript directly.
   * @module config
   */
  function ($, ConfigData) {
    var _queryParams = $.getQueryParams();

    function isDevMode() {
      return ConfigData.environment === "development";
    }

    return $.extend(true, ConfigData, {
      /**
      * Returns a boolean value indicating wether the application runs in development mode or not.
      *
      * @returns {boolean} Returns true if the application is running in development mode, false otherwise
      *
      * @function module:config.isDevMode
      */
      isDevMode: isDevMode,

      /**
      * Returns a boolean value indicating wether the application runs in production mode or not.
      *
      * @returns {boolean} Returns true if the application is running in production mode, false otherwise
      *
      * @function module:config.isProd
      */
      isProd: function() {
        return ConfigData.environment === "production";
      },

      /**
      * Returns a boolean value indicating wether the application is currently running in debug mode.
      * Debug mode is automatically applied to the development environment, but can also be triggered by
      * setting the query parameter 'debug' in the URL.
      *
      * @returns {boolean} Returns true if the application is running in debug mode, false otherwise
      *
      * @function module:config.isDebugMode
      */
      isDebugMode: function () {
        return isDevMode() || _queryParams.debug !== undefined;
      },

      /**
      * Returns the query parameters listed in the URL.
      *
      * @returns {Object} A map of all query parameters listed in the URL
      *
      * @function module:config.getQueryParams
      */
      getQueryParams: function () {
        return _queryParams;
      }
    });
  }
);