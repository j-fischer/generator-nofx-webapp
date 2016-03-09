define([
  'jquery',
], function($) {

    /*!
     *  The MIT License (MIT)
     *
     *  Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
     *
     **  Permission is hereby granted, free of charge, to any person obtaining a copy
     *   of this software and associated documentation files (the "Software"), to deal
     *   in the Software without restriction, including without limitation the rights
     *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     *   copies of the Software, and to permit persons to whom the Software is
     *   furnished to do so, subject to the following conditions:
     *
     *   The above copyright notice and this permission notice shall be included in
     *   all copies or substantial portions of the Software.
     *
     *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     *   THE SOFTWARE.
     *
    */
  $.extend({
    getQueryParams : function (str) {
      var queryStr = str || window.location.search;
      if (typeof queryStr !== 'string') {
        return {};
      }

      queryStr = queryStr.trim().replace(/^(\?|#|&)/, '');

      if (!queryStr) {
        return {};
      }

      return queryStr.
        split('&').
        reduce(function (result, param) {
          var parts = param.replace(/\+/g, ' ').split('=');
          // Firefox (pre 40) decodes `%3D` to `=`
          // https://github.com/sindresorhus/query-string/pull/37
          var key = parts.shift();
          var val = parts.length > 0 ? parts.join('=') : undefined;

          key = decodeURIComponent(key);

          // missing `=` should be `null`:
          // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
          val = val === undefined ? null : decodeURIComponent(val);

          if (!result.hasOwnProperty(key)) {
            result[key] = val;
          } else if (Array.isArray(result[key])) {
            result[key].push(val);
          } else {
            result[key] = [result[key], val];
          }

          return result;
        }, {});
    }
  });

  return $;
});