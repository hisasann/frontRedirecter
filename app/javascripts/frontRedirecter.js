
/*!
 * frontRedirecter
 *
 * Copyright 2014 hisasann
 * Released under the MIT license
 */

(function() {
  (function($) {
    var COOKIE_NAME, DEFAULT_LANGUAGE, EXPRESSION, cookieLang, getPage, getUrlLanguage, getUserLanguage, page, prefix, redirectPage, referer, urlLang, userLang;
    DEFAULT_LANGUAGE = 'en';
    COOKIE_NAME = 'language';
    prefix = '';
    EXPRESSION = /en|ja|zh|zh-TW/;
    getUserLanguage = function() {
      var e;
      try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getUrlLanguage = function() {
      var e, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/(en|ja|zh|zh-TW)+\/?.*$/i;
      url = location.href;
      try {
        return url.match(urlExpression)[4].substr(0, 2);
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getPage = function() {
      var e, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/((en|ja|zh|zh-TW)\/)?(.*)$/i;
      url = location.href;
      try {
        return url.match(urlExpression)[6];
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    redirectPage = function(dest) {
      if (window.location.replace) {
        window.location.replace(dest);
      } else {
        window.location = dest;
      }
    };
    referer = document.referrer || '';
    if ($.type(referer) !== 'string') {
      return;
    }
    userLang = getUserLanguage();
    urlLang = getUrlLanguage();
    page = getPage();
    cookieLang = $.cookie(COOKIE_NAME);
    console.log('lang: ', userLang);
    console.log('urlLang: ', urlLang);
    console.log('page: ', page);
    console.log('cookieLang: ', cookieLang);
    if (!EXPRESSION.test(userLang)) {
      if (urlLang) {
        redirectPage([prefix, '/', page].join(''));
      }
      return;
    }
    console.log(1);
    if (cookieLang) {
      if (cookieLang === urlLang) {
        if (urlLang === DEFAULT_LANGUAGE) {
          redirectPage([prefix, '/'].join(''));
        }
        return;
      }
      if (cookieLang === DEFAULT_LANGUAGE) {
        if (urlLang) {
          redirectPage([prefix, '/', page].join(''));
        }
      } else {
        redirectPage([prefix, '/', userLang, '/', page].join(''));
      }
      return;
    }
    if (!cookieLang) {
      $.cookie(COOKIE_NAME, userLang);
      if (userLang === urlLang) {
        if (urlLang === DEFAULT_LANGUAGE) {
          redirectPage([prefix, '/'].join(''));
        }
        return;
      }
      if (userLang === DEFAULT_LANGUAGE) {
        if (urlLang) {
          redirectPage([prefix, '/', page].join(''));
        }
      } else {
        if (userLang === DEFAULT_LANGUAGE) {
          if (page) {
            redirectPage([prefix, '/', page].join(''));
          }
        } else {
          redirectPage([prefix, '/', userLang, '/', page].join(''));
        }
      }
    }
  })(jQuery);

}).call(this);
