
/*!
 * frontRedirecter
 *
 * Copyright 2014 hisasann
 * Released under the MIT license
 */

(function() {
  (function($) {
    var COOKIE_NAME, DEFAULT_LANGUAGE, EXPRESSION, getPage, getUrlLanguage, getUserLanguage, makeLanguage, page, prefix, redirectPage, referer, urlLang, userLang;
    DEFAULT_LANGUAGE = 'en';
    COOKIE_NAME = 'language';
    prefix = '';
    EXPRESSION = /gb|ie|se|no|pt|sg|id|ph|my|hk|cn|fr|it|de|es|tr|pl|ko|th|ar|en|ja|zh\-TW|zh/i;
    makeLanguage = function(lang) {
      if (/zh-TW/i.test(lang)) {
        lang = 'zh-TW';
        return lang;
      } else {
        lang = lang.substr(0, 2);
      }
      if (/en|gb|ie|se|no|pt|sg|id|ph|my|hk/i.test(lang)) {
        lang = 'en';
      } else if (/cn|zh/i.test(lang)) {
        lang = 'zh';
      } else if (/kr/i.test(lang)) {
        lang = 'ko';
      } else if (/ae|kw/i.test(lang)) {
        lang = 'ar';
      }
      console.log(lang);
      return lang;
    };
    getUserLanguage = function() {
      var e, lang;
      try {
        lang = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 5);
        return makeLanguage(lang);
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getUrlLanguage = function() {
      var e, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/(gb|ie|se|no|pt|sg|id|ph|my|hk|cn|fr|it|de|es|tr|pl|ko|th|ae|kw|en|ja|zh\-TW|zh)+\/?.*$/i;
      url = location.href;
      try {
        return makeLanguage(url.match(urlExpression)[4].substr(0, 5));
      } catch (_error) {
        e = _error;
        return '';
      }
    };
    getPage = function() {
      var e, url, urlExpression;
      urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/((fr|it|de|es|tr|pl|ko|th|ar|en|ja|zh\-TW|zh)\/)?(.*)$/i;
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
