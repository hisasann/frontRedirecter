
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
    EXPRESSION = /en|ja|zh\-TW|zh/i;
    getUserLanguage = function() {
      var e, lang;
      try {
        lang = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 5);
        if (/zh-TW/i.test(lang)) {
          lang = 'zh-TW';
        } else {
          lang = lang.substr(0, 2);
        }
        return lang;
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getUrlLanguage = function() {
      var e, lang, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/(en|ja|zh\-TW|zh)+\/?.*$/i;
      url = location.href;
      try {
        lang = url.match(urlExpression)[4].substr(0, 5);
        if (/zh-TW/i.test(lang)) {
          lang = 'zh-TW';
        } else {
          lang = lang.substr(0, 2);
        }
        return lang;
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getPage = function() {
      var e, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/((en|ja|zh\-TW|zh)\/)?(.*)$/i;
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
    if (!EXPRESSION.test(userLang)) {
      if (urlLang) {
        redirectPage([prefix, '/', page].join(''));
      }
      return;
    }
    if (userLang !== urlLang) {
      if (userLang === DEFAULT_LANGUAGE) {
        if (urlLang) {
          redirectPage([prefix, '/', page].join(''));
        }
      } else {
        return redirectPage([prefix, '/', userLang, '/', page].join(''));
      }
    }
  })(jQuery);

}).call(this);
