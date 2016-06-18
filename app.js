const app = require('express')();

app.get("/",(req,res,next)=>{
	console.log(req.query.signature);
	console.log(req.query.echostr);
	res.send(req.query.echostr);
});

app.listen(80);