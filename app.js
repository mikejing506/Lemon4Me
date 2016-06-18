var app = require('express')();
var crypto = require('crypto'), sha1sum = crypto.createHash('sha1');

var token = "1234567890"

app.get("/",(req,res,next)=>{
	var arr [req.query.timestamp,req.query.nonce,token];
	sha1sum.update(array.sort().join(""));
	var sign = sha1sum.digest('hex')
	console.log(sign);
	if (sign == req.query.signature) {
		res.send(req.query.echostr);
	}
});

app.listen(80);
