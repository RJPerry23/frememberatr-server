const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticator = (req, res, next) => {
    // If there is no auth header provided
    if (!req.headers.authorization) {
        return res.status(401).send({auth: false})
    } 
  
    // Parse the Bearer token
    if (req.headers.authorization) {
        const authToken = req.headers.authorization.split(" ")[1];
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
              return res.status(401).send("Invalid auth token");
            }
            else{
                req.decoded = decoded
                next()
            }
            });      
        }
    };

module.exports = authenticator