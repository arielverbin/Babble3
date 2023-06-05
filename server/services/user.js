const User = require('../models/user');

const createUser = async (username, password, displayName, profilePic) => {
    try {
        const user = new User({
            username: username,
            password: password,
            displayName: displayName,
            profilePic: profilePic
        });
        await user.save();
        return 'success';
    } catch (error) {
        console.log("Error creating user: " + error);
        return null;
    }
};

const updateUser = async (username, newPic, newDisplayName) => {
    try {
        if (newPic) {
            await User.findOneAndUpdate(
                {username: username}, // Filter condition to find the user
                {profilePic: newPic}, // Updated field and value
                {new: false}
            );
        }
        if (newDisplayName) {
            await User.findOneAndUpdate(
                {username: username}, // Filter condition to find the user
                {displayName: newDisplayName}, // Updated field and value
                {new: false}
            );
        }
    } catch (error) {
        console.log("Error updating values: " + error);
        return null;
    }
    return 'success';
}

const getUser = async (username) => {
    return User.findOne({username: username});
}

module.exports = {createUser, getUser, updateUser}
