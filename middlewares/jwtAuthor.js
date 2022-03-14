const {
  publicKey
} = require('../config').RSA;

const jwt = require('express-jwt');
const fs = require('fs');
const pubkey = fs.readFileSync(publicKey);

const jwtAuthor = jwt({
  secret: pubkey,
  algorithms: ['RS256'],
  credentialsRequired: true,
  requestProperty: 'auth',
});

module.exports = jwtAuthor;
