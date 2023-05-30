const userService = require('../services/user');

const createUser = async (req, res) => {
    const x = await userService.existUser(req.body.username);
    if (x) {
        return res.status(409).json({ message: 'Username is already taken' });
    }
    res.json(await userService.createUser(req.body.username, req.body.password,
        req.body.displayName, req.body.profilePic));
        
    res.status(200); // Return 200 status code and the saved user object

};

const getUser = async (_, res) => {
    res.json(await  userService.getUser());
};

module.exports = {createUser , getUser};
