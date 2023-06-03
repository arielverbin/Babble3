const authService = require('../services/token');

async function login(req, res) {

    // Check login credentials
    const {username, password} = req.body;

    const user = await authService.getUserByUsername(username);

    if (!user || user.password !== password) {
        return res.status(404).json({message: 'Invalid username and/or password'});
    }

    // Generate the JWT token
    const token = authService.generateToken(username);

    // Success! Send JWT back to client.
    return res.status(200).send(token);
}

module.exports = {login};

