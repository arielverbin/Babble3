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
    try {
        const user = await User.findOne(
            {username},
            {username: 1, _id: 1, password: 1, profilePic: 1, displayName: 1}
        ).lean();

        if (user) {
            const {_id, ...userData} = user;
            return {id: _id, ...userData};
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error in finding user: " + error);
        return null;
    }
};


const getSocketID = async (username) => {
    try {
        return (await User.findOne({username})).currentSocket;
    } catch (error) {
        console.log("Error getting socket.")
        return null;
    }
}

const attachSocket = async (username, socketID) => {
    try {
        const user = await User.findOne({username});

        if (user) {
            user.currentSocket = socketID;
            await user.save();
            console.log("Successfully attached socket " + socketID + " to: " + username);
        } else {
            console.log('User not found: username=' + username + ', socketID=' + socketID);
        }
    } catch (error) {
        console.error('Error updating current socket:', error);
    }
}

const disconnect = async (username) => {
    try {
        const user = await User.findOne({username});
        if (user) {
            user.currentSocket = null;
            await user.save();
        } else {
            console.log('User not found: username=' + username);
        }
    } catch (error) {
        console.error('Error updating current socket:', error);
    }
}

module.exports = {createUser, getUser, updateUser, attachSocket, getSocketID, disconnect}
