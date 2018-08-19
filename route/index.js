const express = require('express')
const route = express.Router();

route.get('/',(req,res)=>{
    res.json({msg:":)"})
})
route.post('/',(req,res)=>{
    res.json({msg:"succeed"})
})

module.exports = route;