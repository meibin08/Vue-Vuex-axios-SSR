
const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)

var cookieParser = require('cookie-parser')
var compression = require('compression')
var config = require('./config')
module.exports = function (app) {
  // app.set('views', config.root + '/src/views');//设置模板文件路径
  app.set('views', config.root + '/src/views');//设置模板文件路径
  // app.engine('.html', require('ejs').__express)
  // app.set('view engine', 'html');
  const isProd = process.env.NODE_ENV === 'production'

  /*
	@ maxAge 最大缓存30天
  */
	const serve = (path, cache) => express.static(resolve(path), {
	  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
	})
  app.use(cookieParser())
  app.use(compression({ threshold: 0 }))
	/*
		@ 设置全部静态资源访问路径
		@ assets 编译后的文件目录
  */
  let static =isProd?"assets":"src";
	app.use('/assets', serve(config.root + '/assets', true)) //
	app.use('/static', serve(config.root + '/'+static+'/public', true))
	app.use('/manifest.json', serve(config.root + '/manifest.json', true))
	app.use('/service-worker.js', serve(config.root + '/assets/service-worker.js'))
	app.use(favicon(config.root + '/'+static+'/public/logo-48.png'))






}