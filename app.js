var express = require('express');
var app = express();
// var WechatAPI = require('wechat-api');
var path = require('path');
// var crypto = require('crypto'), sha1sum = crypto.createHash('sha1');
var config = require('./config.json');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection(config.database);

// var api = new WechatAPI(config.app_id, config.appsecret);
var fs = require('fs');

// WeChat API

// app.get("/",(req,res,next)=>{
// 	var arr = [req.query.timestamp,req.query.nonce,config.token];
// 	sha1sum.update(arr.sort().join(""));
// 	var sign = sha1sum.digest('hex')
// 	console.log(sign);
// 	if (sign == req.query.signature) {
// 		res.send(req.query.echostr);
// 	}
// });

// api.createMenu(config.menu,(err,res)=>{

// });

// WebServer

// connection.connect();

app.use(bodyParser());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/assets', express.static('public/assets'));

app.route("/shiye")
	.get((req,res,next)=>{
		res.render('shiye');
	});

app.post("/shiye/last",(req,res,next)=>{
	
});

app.route('/me')
	.get((req,res,next)=>{
		res.render('shiye');
	}).post();

app.listen(8080);