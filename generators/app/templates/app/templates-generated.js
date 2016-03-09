define(['handlebars', 'handlebars-helpers'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["application"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"container-fluid bg-info\">\n  <h2>Simple Web App Generator</h2>\n  <p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"introduction",{"name":"i18n","hash":{},"data":data}))
    + "\n    <ul>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"features.seperation",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"features.responsiveDesign",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"features.internationalization",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"features.buildSupport",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n    </ul>\n  </p>\n\n  <p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"librariesInfo",{"name":"i18n","hash":{},"data":data}))
    + "\n    <ul>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"libraries.lodash",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"libraries.jquery",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"libraries.handlebars",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"libraries.i18next",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n      <li>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"libraries.moment",{"name":"i18n","hash":{},"data":data}))
    + "</li>\n    </ul>\n  </p>\n\n  <p>"
    + ((stack1 = (helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"switchLanguage",{"name":"i18n","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>\n  <span>"
    + alias3(((helper = (helper = helpers.today || (depth0 != null ? depth0.today : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"today","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n";
},"useData":true});

return this["JST"];

});