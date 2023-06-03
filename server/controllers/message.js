const messageService = require('../services/message');
const userService = require('../services/user')
const chatService = require('../services/chat')
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";


const sendMessage = async (req, res) => {
    // Get our username ID.
    const userID = (await userService.getUser(req.username))._id;
    // Get the current chat ID.
    const chatID = req.params.id;

    //create message
    const message = await messageService.createMessage(userID, req.body.msg);
    if (!message) {
        return res.status(500).send("Error creating a new message.");
    }
    //add message to chat
    if (!(await chatService.addMsgToChat(chatID, message._id))) {
        return res.status(500).send("Error adding message to chat.");
    }

    return res.status(200).json(message);
}

const getMessages = async (req, res) => {
    const chat = await chatService.findChatById(req.params.id);
    if (!chat) {
        return res.status(404).send("Chat not found");
    }

    //get the chat's messages
    const messages = chat.messages;
    return res.status(200).json(messages);
}

const isLoggedIn = async (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            req.username = data.username; // Store the data in req.user object

            // Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(403).send('Token required');
};

module.exports = {isLoggedIn, sendMessage, getMessages};
