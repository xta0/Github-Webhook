require('dotenv').config()

if(process.env.NODE_EVN === 'production'){
    module.exports = require('./conifg_prod')
}else{
    module.exports = require('./config_dev')
}