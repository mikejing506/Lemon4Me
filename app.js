const app = require('express')();

app.get("/",(req,res,next)=>{
	console.log(req.query);
});

app.listen(80);