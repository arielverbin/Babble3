// services/AuthService.js
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  generateToken(user) {
    const token = jwt.sign({ username: user.username, password: user.password }, this.secretKey);
    return token;
  }
}

module.exports = AuthService;
