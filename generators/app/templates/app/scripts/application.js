define([
  'jquery',
  'moment',
  'templates',
],
  /**
   * This is the root module of the application.
   * @module application
   */
  function($, moment, Templates) {
    var _id = "application";
    var _defaultTemplate = "application";

    return {
     /**
      * Starts the application after all dependencies have been initialized.
      *
      * @function module:application.run
      */
      run: function() {
        var template = Templates[_defaultTemplate];
        $("#" + _id).html(template({
          today: moment().format('LLL')
        }));
      }
    };
  });