var app = require('express')();
var WechatAPI = require('wechat-api');
var crypto = require('crypto'), sha1sum = crypto.createHash('sha1');
var config = require('./config.json');
var api = new WechatAPI(config.app_id, config.appsecret);

app.get("/",(req,res,next)=>{
	var arr = [req.query.timestamp,req.query.nonce,config.token];
	sha1sum.update(arr.sort().join(""));
	var sign = sha1sum.digest('hex')
	console.log(sign);
	if (sign == req.query.signature) {
		res.send(req.query.echostr);
	}
});

api.createMenu(config.menu,(err,res)=>{
	
});

app.listen(80);
