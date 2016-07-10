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
    var _id = "navigation";
    var _defaultTemplate = "navigation";

    return {
      init: function () {
        var template = Templates[_defaultTemplate];
        $("#" + _id).html(template());
      }
    };
  });