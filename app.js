var app = require('express')();
var WechatAPI = require('wechat-api');
var crypto = require('crypto'), sha1sum = crypto.createHash('sha1');
var config = require('./config.json');
var api = new WechatAPI(config.app_id, config.appsecret);
var fs = require('fs');

// WeChat API

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

// WebServer

app.engine('rj',(page,callback)=>{
  fs.readFile('views/index.html', function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('$js$', ''+ page +'.js');
    return callback(null, rendered);
  });
});
app.set('views', './views');
app.set('view engine','rj');

app.use('/public', express.static('public'));

app.route("/shiye")
	.get((req,res,next)=>{
		res.render('shiye');
	}).post((req,res,next)=>{

	});

app.route('/me').get().post();

app.listen(80);