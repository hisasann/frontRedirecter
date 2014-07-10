###!
 * frontRedirecter
 *
 * Copyright 2014 hisasann
 * Released under the MIT license
###
# via http://qiita.com/Evolutor_web/items/ec602b8292d2051ca031
# http://qiita.com/makoto_kw/items/9d1af5855012a2a7278d
(($) ->
  # http://localhost:4567/zh-TW/
  DEFAULT_LANGUAGE = 'en'
  COOKIE_NAME = 'language'
  prefix = ''
  EXPRESSION = /en|ja|zh\-TW|zh/i

  getUserLanguage = () ->
    try
      lang = (navigator.browserLanguage or navigator.language or navigator.userLanguage).substr(0, 5)
#      lang = 'en'
      if /zh-TW/i.test(lang)
        lang = 'zh-TW'
      else
        lang = lang.substr(0, 2)

      return lang
    catch e
      return ''
    return

  getUrlLanguage = () ->
    urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/(en|ja|zh\-TW|zh)+\/?.*$/i
    url = location.href
    try
      lang = url.match(urlExpression)[4].substr(0, 5)
      if /zh-TW/i.test(lang)
        lang = 'zh-TW'
      else
        lang = lang.substr(0, 2)

      return lang
    catch e
      return ''
    return

  getPage = () ->
    urlExpression = /^http(s)?:\/\/([\w-]+\.?)+[\w-]+(:[0-9]+)?\/((en|ja|zh\-TW|zh)\/)?(.*)$/i
    url = location.href
    try
      return url.match(urlExpression)[6]
    catch e
      return ''
    return

  redirectPage = (dest) ->
    if window.location.replace
      window.location.replace dest
    else
      window.location = dest
    return

  referer = document.referrer or ''
  #  console.log 'referer: ', referer
  if $.type(referer) isnt 'string'
    return
  #  console.log 'document.location.origin: ', document.location.origin
  #  if referer.indexOf(document.location.origin) isnt 0

  userLang = getUserLanguage()
  urlLang = getUrlLanguage()
  page = getPage()
  cookieLang = $.cookie COOKIE_NAME
#  console.log 'lang: '+ userLang
#  console.log 'urlLang: '+ urlLang
#  console.log 'page: '+ page
#  console.log 'cookieLang: '+ cookieLang

  # 指定言語以外の言語でアクセスされた場合
  if !EXPRESSION.test userLang
    if urlLang
      redirectPage [prefix, '/', page].join('')
    return

  # userとurlが違う
  if userLang isnt urlLang
    if userLang is DEFAULT_LANGUAGE
      # userがデフォルトの場合
      if urlLang
        # urlがある場合
        redirectPage [prefix, '/', page].join('')
        return
    else
      # userがデフォルトでない場合
      redirectPage [prefix, '/', userLang, '/', page].join('')

) jQuery
