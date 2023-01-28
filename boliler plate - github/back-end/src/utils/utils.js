const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

function verifyHeader(req){
    if (!req.headers.authorization){console.log({ error: 'No credentials sent!' });return undefined;}
    try{return jwt.verify(req.headers.authorization,SECRET)}catch{console.log({ error: 'invalid token sent!' });return undefined}
}
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//export app
module.exports.verifyHeader = verifyHeader
module.exports.jsonParser = jsonParser
module.exports.urlencodedParser = urlencodedParser