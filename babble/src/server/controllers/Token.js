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
    // Implement your own logic here
    const isValidCredentials = true; // Replace with your logic to check login credentials

    if (!authService.getUserByUsername(req.body.username)) {
      return res.status(404).json({ message: 'Invalid username and/or password' });
    }

    // Generate the JWT token
    const token = authService.generateToken(req.body.username);

    res.status(200).json({ token });
  }
}

module.exports = TokenController;
