var EventEmitter = require ('events')
class TaskQueue extends EventEmitter{
    constructor(){
        super()
        this._queue = []
    }
    push(job){
        if(this._queue.length > 0){
            this._queue.push(job)
        }else{
            this.run(job)
        }
    }
    run(job){
        if(job.callback){
            const error = job.callback()
            if(error.length > 0){
                this.emit('Error',error)
            }else{
                this.emit('Complete',job.id)
            }
            this._queue.shift();
        }
        if(this._queue.length > 0){
            this.run(this._queue.shift())
        }
    }
}
module.exports = TaskQueue;