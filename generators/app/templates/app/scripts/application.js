define([
  'jquery',
  'moment',
  'templates',
  'scripts/navigation'
],
  /**
   * This is the root module of the application.
   * @module application
   */
  function($, moment, Templates, Navigation) {
    var _id = "application";
    var _defaultTemplate = "application";

    return {
     /**
      * Starts the application after all dependencies have been initialized.
      *
      * @function module:application.run
      */
      run: function() {
        Navigation.init();

        var template = Templates[_defaultTemplate];
        $("#" + _id).html(template({
          today: moment().format('LLL')
        }));
      }
    };
  });