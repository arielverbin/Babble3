const userService = require('../services/user');

const createUser = async (req, res) => {
    const x = await userService.getUser(req.body.username);
    if (x) {
        return res.status(409).json({ message: 'Username is already taken' });
    }
    res.json(await userService.createUser(req.body.username, req.body.password,
        req.body.displayName, req.body.profilePic));

    res.status(200); // Return 200 status code and the saved user object

};

// Define a function that responds with a json response.
// Only logged in users should be able to execute this function
const afterTokenGetUser = async (req, res) => {
    console.log(req.params.id)
    const user = await userService.getUser(req.params.id);
    
    res.status(200).json({username: user.username , displayName: user.displayName , profilePic: user.profilePic});
    
}

const getUser = async (req, res, next) => {
     if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            console.log('The logged in user is: ' + data.username);
            //Token validation was successful. Continue to the actual function (index)
            return next()
        }
        catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
};

module.exports = { createUser, getUser , afterTokenGetUser};
