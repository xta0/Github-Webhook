const bunyan = require ('bunyan')

const http_logger = bunyan.createLogger({
    name: 'HTTP',
    serializers: bunyan.stdSerializers,
    streams:[{
        level: 'debug',
        stream: process.stdout
    },
    {
        level: 'error',
        path: './logs/error.log'
    },
    {
        level: 'info',
        path: './logs/access.log'
    }]
})

const build_logger = bunyan.createLogger({
    name: 'Build',
    streams:[
    {
        level: 'debug',
        stream: process.stdout
    },
    {
        level: 'trace',
        path: './logs/build.log'
    }]
})
module.exports = {
    http_logger,
    build_logger
};

