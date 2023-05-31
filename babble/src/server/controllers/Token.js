const User = require('../models/Token');
const AuthService = require('../services/AuthService');

class TokenController {
  constructor(authService) {
    this.authService = authService;
  }

  login(req, res) {
    // Retrieve the user login data from the request body
    const { username, password } = req.body;

    // Implement logic to check login credentials
    // If incorrect, return 404
    // If correct, generate the JWT token using the auth service
    const user = new User({ username, password });
    const token = this.authService.generateToken(user);

    // Return the token as the response
    res.json({ token });
  }
}

module.exports = TokenController;
