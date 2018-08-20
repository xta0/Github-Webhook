const bunyan = require ('bunyan')
const default_logger = bunyan.createLogger({
    name: 'Default',
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
    default_logger,
    build_logger
};

