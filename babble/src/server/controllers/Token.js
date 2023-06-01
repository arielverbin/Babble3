// controllers/Token.js

const User = require('../models/Token');
const AuthService = require('../services/AuthService');

class TokenController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    const authService = new AuthService();

    // Check login credentials
    const { username, password } = req.body;
    const user = await authService.getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(404).json({ message: 'Invalid username and/or password' });
    }

    // Generate the JWT token
    const token = authService.generateToken(username);

    res.status(200).json({ token });
  }
}

module.exports = TokenController;
