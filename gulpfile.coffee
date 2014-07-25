'use strict'

gulp = require 'gulp'
$ = require('gulp-load-plugins')()

# JavaScript Task
# CoffeeScriptのlintとcompile
gulp.task 'js', ->
  gulp.src './src/javascripts/*.coffee'
  .pipe $.plumber()
    .pipe $.coffeelint
        max_line_length:
          value: 200
      .pipe $.coffeelint.reporter()
        .pipe $.coffee({bare: false}).on 'error', (err) ->
            console.log err
          .pipe gulp.dest 'app/javascripts/'
            .pipe $.size() #jsのファイルサイズ
#    .pipe $.concat('all.js')
#    .pipe uglify()


# CSS Task
# sassのcompileとautoprefixer、minify用のcsso
gulp.task 'css', ->
  gulp.src './src/stylesheets/*.scss'
  .pipe $.sass
      errLogToConsole: true
    .pipe $.autoprefixer 'last 1 version', '> 1%', 'ie 8'
      #.pipe $.csso()
      .pipe gulp.dest 'app/stylesheets/'
        .pipe $.size() #cssのファイルサイズ


# middleman Dynamic-Proxy copy
gulp.task 'copy', ->
  gulp.src('src/page-generator/app/**/*').pipe gulp.dest('app/pages/sample')


# Server
port = 4567
gulp.task 'connect', ->
  connect = require 'connect'
  app = connect()
  .use(require('connect-livereload')({port: 35729}))
  .use(connect.static('app'))
  .use(connect.directory('app'));

  http = require 'http'
  http.createServer(app)
  .listen(4567)
  .on 'listening', ->
      console.log 'Start Server on http://localhost:', port

gulp.task 'serve', ['connect', 'js', 'css'], ->
  require('opn')('http://localhost:' + port)

gulp.task 'watch', ['copy', 'connect', 'serve'], ->
  server = $.livereload()
  # listen livereload server
  $.livereload.listen()

  gulp.watch([
    'app/*.html',
    'app/stylesheets/*.css',
    'app/javascripts/*.js'
  ]).on 'change', (file)->
    server.changed file.path

  gulp.watch './src/javascripts/*.coffee', ['js']
  gulp.watch './src/stylesheets/*.scss', ['css']
