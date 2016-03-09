# generator-nofx-webapp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generates web application with grunt, requirejs, handlebars, sass, jquery, localization, logging and more.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-nofx-webapp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-nofx-webapp
```

Then generate your new project:

```bash
yo nofx-webapp
```

## Project Overview

This project setup for frontend development is not intended to be used with a major framework (Ember, Angular, etc.), but allows you
to start out with a minimal set of tools (requirejs, lodash, jQuery, Handlebars, moment.js, log4javascript, i18next) and grow your dependencies
as you application requires it.

The grunt build script will create a fully optimized build (uglified, concatenated, hashed, etc.) with a single Javascript file. The build also
replaces requirejs with almond.js to further reduce the foodprint of your dependencies. If you require dynamically loading of dependencies,
you may have to modify the build process.

Last, the build also creates a full set of project reports including JsDoc, unit test coverage, lists TODO & FIXMEs and creates a
static source code analysis using plato.

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Johannes Fischer](https://ca.linkedin.com/in/johannes-fischer-01a0177)


[npm-image]: https://badge.fury.io/js/generator-nofx-webapp.svg
[npm-url]: https://npmjs.org/package/generator-nofx-webapp
[travis-image]: https://travis-ci.org/j-fischer/generator-nofx-webapp.svg?branch=master
[travis-url]: https://travis-ci.org/j-fischer/generator-nofx-webapp
[daviddm-image]: https://david-dm.org/j-fischer/generator-nofx-webapp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/j-fischer/generator-nofx-webapp
