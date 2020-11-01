const jwt = require('jsonwebtoken');
const config = require('../config');

const {
  JWT_SECRET
} = config;

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({
      msg: 'No token, authorizaton denied'
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: 'Token is not valid'
    });
  }
};

module.exports = auth;
