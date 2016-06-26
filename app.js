var express = require('express');
var app = express();
// var WechatAPI = require('wechat-api');
var path = require('path');
// var crypto = require('crypto'), sha1sum = crypto.createHash('sha1');
var config = require('./config.json');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var session = require('express-session');
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

connection.connect();

app.use(session({
  secret: '.|o5}bJl-he=v{D4@(9`cAw.n.A~HR,m', // 建议使用 128 个字符的随机字符串
}));

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
	connection.query("SELECT * FROM news ORDER BY id DESC LIMIT 16",(err, rows, fields)=>{
		if (!err) {
			res.send(JSON.stringify(rows));
		} else {
			throw err;
		}

	});
});

app.route('/panel')
	.get((req,res,next)=>{
		res.render('panel');
	})
	.post((req,res,next)=>{
		switch(req.body.do){
			case 'login':
				if (req.body.username != 'undefined' && req.body.passwd != 'undefined') {
					connection.query("SELECT * FROM admin WHERE username = ? LIMIT 1",[req.body.username],(err,rows,fields)=>{
						console.log(JSON.stringify(rows)+"\n"+JSON.stringify(req.body));
						if (rows.passwd == req.body.passwd) {
							req.session.token == Math.random().toString(36).substr(2,17);
							res.send('{"result":0,"token":"'+req.session.token+'""}');
						}else{
							res.send('{"result":1}');
						}
					});
				}else{
					res.send('{"result":2}');
				}
				break;
			case 'add_news':
				if (req.session.token == req.body.token) {
					// connection.query()
				}
		}
	});

app.route('/me')
	.get((req,res,next)=>{
		res.render('shiye');
	}).post();

app.listen(8080);