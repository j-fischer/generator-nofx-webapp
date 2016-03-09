define([
  'handlebars',
  'i18next'
], function(Handlebars, I18next) {

  Handlebars.registerHelper('i18n',
    function(key, options){
      return I18next.t(key, options);
    }
  );
});