const express = require('express')
const route = express.Router();
const validate = require('../utils/validation')
const TaskQueue = require('../utils/taskqueue')
// const execSync = require('child_process').execSync
const exec_async = require('child_process').exec
const logger = require('../utils/logger').build_logger

const queue = new TaskQueue()
queue.on('Complete',(id)=>{
    logger.info("[Job complete]: ",id)
})
queue.on('Error',(msg)=>{
    logger.info("[Job error]: ",msg)
})

route.get('/',(req,res)=>{
    res.json({msg:":)"})
})
route.post('/',(req,res)=>{
    res.json({status: "succeed"})
    const job = {
        id: req.body.commits[0].id,
        callback: new Promise((resolve, reject)=>{
            if(!validate(req)){
                return "validation failed"
            }
            exec_async('./jekyll-build.sh',{stdio:[0,1,2]},(err,stdout,stderr)=>{
                if(err){
                    logger.info(`[Build Error]: ${req.body.commits[0].id} | ${stderr}`)
                    reject(stderr)
                }else{
                    logger.info(`[Buil Succeed]: ${req.body.commits[0].id} | ${stdout}`)
                    resolve()
                }
            })
        })
    }
    queue.push(job)
})

module.exports = route;