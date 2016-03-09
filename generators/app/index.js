'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  _copy: function (src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  },

  _copyAndReplace: function (src, dest, context) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      context
    );
  },

  configuring: function () {
    this._copy('editorconfig', '.editorconfig');
    this._copy('gitignore', '.gitignore');
    this._copy('bowerrc', '.bowerrc');
    this._copy('hgignore', '.hgignore');
    this._copy('jsdoc', '.jsdoc');
  },

  writing: function () {
    this._copy('Gruntfile.js', 'Gruntfile.js');
    this._copy('karma-conf.js', 'karma-conf.js');

    this._copy('bower.json', 'bower.json');
    this._copy('package.json', 'package.json');

    this._copy('app', 'app');
    this._copy('test', 'test');
  },

  install: function () {
    this.installDependencies();
  }
});
