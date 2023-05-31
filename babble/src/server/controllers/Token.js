// controllers/TokenController.js
const User = require('../models/Token');
const AuthService = require('../services/AuthService');

class TokenController {
  constructor(authService) {
    this.authService = authService;
  }

  createToken(req, res) {
    // Retrieve the user registration data from the request body
    const { username, password } = req.body;

    // Create a new user instance
    const user = new User({
      username: username,
      password: password
    });

    // Generate the JWT token using the auth service
    const token = this.authService.generateToken(user);

    // Return the token as the response
    res.json({ token });
  }
}

module.exports = TokenController;
