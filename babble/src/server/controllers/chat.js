const chatService = require('../services/chat');
const userService = require('../services/user')
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library


const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

const getChatsByUser = async (req, res) => {
    const { username } = req.user; // Access the username from req.user object set by isLoggedIn middleware
    const chats = await chatService.searchChatsByUser(username);

    return res.status(200).json(chats);
};

const addChat = async (req, res) => {
    const { username } = req.user; // Access the username from req.user object set by isLoggedIn middleware
    const myUser = await userService.getUser(username);
    const user2 = await userService.getUser(req.body.username);
    if (!user2) {
        return res.status(400).send('No such user');
    }
    if (myUser.username === user2.username) {
        return res.status(400).send('Thou shalt not talk with thy self');
    }
    const id = await chatService.createChat(myUser, user2);
    return res.status(200).json({ id: id, user: { username: user2, displayName: user2.displayName, profilePic: user2.profilePic } })
};

const deleteChat = async (req, res) => {
    const deleteResult = await chatService.deleteChat(req.params.id)
    if (deleteResult === 1){
        return res.status(200)
    }
    else  return res.status(400)
}



const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            req.user = data; // Store the data in req.user object
            console.log('The logged in user is: ' + data.username);
            // Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
};


module.exports = { isLoggedIn, getChatsByUser , addChat , deleteChat}