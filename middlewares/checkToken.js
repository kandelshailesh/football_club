const jwt = require('jsonwebtoken');
const {too,ReS, ReE, TE } = require('../services/util');
const Logger = require("../logger");
const { status_codes_msg } = require('../utils/appStatics');

function verifyToken(req, res, next) {
  const token = req.headers['Authorization'];
  secretOrKey = process.env.JWT_ENCRYPTION;
  if (!token)
  ReE(res, 'No token provided', status_codes_msg.UNAUTHORIZED);
    
  jwt.verify(token, secretOrKey,(err, decoded)=> {
    if (err)
  ReE(res,'Failed to authenticate token.', status_codes_msg.FAILED);

 
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;