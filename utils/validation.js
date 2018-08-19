const config = require('../config/config')
const crypto = require('crypto')

module.exports = function validate(req){
    const checksum = req.get('X-Hub-Signature')
    const hmac = crypto.createHmac('sha1', config.secret_key)
    const digest = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex')
    
    if (!checksum || !digest || checksum !== digest) {
        return false
    }
    return true;
}



