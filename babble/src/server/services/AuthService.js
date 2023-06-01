// services/AuthService.js

/*
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  generateToken(user) {
    const token = jwt.sign({ username: user.username },{password: user.password} ,this.secretKey);
    return token;
  }
}
*/


const jwt = require('jsonwebtoken');
const User = require('../models/user');

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

class AuthService {
  async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }

  generateToken(username) {
    const data = { username };
    const token = jwt.sign(data, key);
    return token;
  }
}

module.exports = AuthService;
