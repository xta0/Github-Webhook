var fs = require('fs')
var express = require('express')
var bodyparser = require ('body-parser')
var helmet = require('helmet')
var 

var app = express()
var port = process.env.PORT || 3000
var ip = process.env.IP || "127.0.0.1"
var jsonParser = bodyparser.json()

var secret = fs.readFileSync(__dirname+'/secret.txt','utf8')

app.post('/',jsonParser,function(req,res){
	res.json({status:'succeed', method:'POST'})
})
app.post('/webhook',jsonParser,function(req,res){
    res.send('RECEIVE WEBHOOK!')
    console.log(req.get('Content-Type'))
    console.log(req.get('X-Hub-Signature'))
    //j校验HMAC
	console.log(req.body)
})
app.use()
app.listen(port,ip, function(){
    console.log("API server has started!")
})

