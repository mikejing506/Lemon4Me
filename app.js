const app = require('express')();
const crypto = require('crypto'), sha1sum = crypto.createHash('sha1');

const token = "1234567890"

app.get("/",(req,res,next)=>{
	let arr [req.query.timestamp,req.query.nonce,token];
	sha1sum.update(array.sort().join(""));
	let sign = sha1sum.digest('hex')
	console.log(sign);
	if (sign == req.query.signature) {
		res.send(req.query.echostr);
	}
});

app.listen(80);
