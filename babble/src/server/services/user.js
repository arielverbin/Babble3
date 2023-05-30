const User = require('../models/user');

const createUser = async (username, password, displayName, profilePic) => {
    
    const user = new User({
        username : username, 
        password: password, 
        displayName : displayName, 
        profilePic: profilePic
    });
    const savedUser = await user.save();
};

const existUser = async (username) => {
    const existingUser = await User.findOne({username: username});
    return existingUser
}

const getUser = async () => {
    return await User.find({}); 
};

module.exports = {createUser , getUser , existUser}
