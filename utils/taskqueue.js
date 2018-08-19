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
            job.callback.then(()=>{
                this.emit('Complete',job.id)
            }).catch((err)=>{
                this.emit('Error',err)
            }).then(()=>{
                this._queue.shift();
                if(this._queue.length > 0){
                    this.run(this._queue.shift())
                }
            })            
        }else{
            if(this._queue.length > 0){
                this.run(this._queue.shift())
            }
        }
    }
}
module.exports = TaskQueue;