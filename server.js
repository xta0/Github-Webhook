const express = require('express')
const bodyparser = require ('body-parser')
const indexRouter = require('./route/index')
const webhookRouter = require('./route/webhook')
const logger = require('./utils/logger').http_logger


const app = express()
const port = process.env.PORT || 3000

//middleware
//caputure log
app.use((req,res,next)=>{
    logger.info(req)
    next();
})
//body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//router
app.use('/',indexRouter)
app.use('/webhook',webhookRouter)

app.listen(port,"127.0.0.1", function(){
    logger.info("Server Started!")
})

