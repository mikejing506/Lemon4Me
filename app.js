const app = require('express')();

app.get("/",(req,res,next)=>{
	console.log(req.query.signature);
});

app.listen(80);