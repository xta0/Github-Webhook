const express = require('express')
const route = express.Router();
const config = require('../config/config')
const kue = require('kue')

const queue = kue.createQueue()
/*
@route: /api/webhook/test
*/
route.get('/webhook/test',(req,res)=>{
    res.json({msg:"Succeed"})
})

// 
route.post('/webhook',(req,res)=>{
    //validate the token
    

})