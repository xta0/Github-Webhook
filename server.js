const express = require('express')
const bodyparser = require ('body-parser')
const indexRouter = require('./route/index')
const webhookRouter = require('./route/webhook')
const logger = require('./utils/logger').default_logger
const config = require('./config/config')

const app = express()

//middleware
//body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//bunyan log
app.use(function(req,res,next){
    logger.info({
        header: JSON.stringify(req.headers),
        body: JSON.stringify(req.body)
    })
    next()
})

//router
app.use('/api',indexRouter)
app.use('/api/webhook',webhookRouter)

app.listen(config.port,"127.0.0.1", function(){
    logger.info("Server Started!")
})

