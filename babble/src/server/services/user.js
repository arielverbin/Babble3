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

const getUser = async (username) => {
    
    const existingUser = await User.findOne({username: username});
    
    console.log(username)
    return existingUser
}

module.exports = {createUser , getUser }
