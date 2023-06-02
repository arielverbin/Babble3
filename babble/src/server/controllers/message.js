const messageService = require('../services/message');
const userService = require('../services/user')
const chatService = require('../services/chat')
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library

const createUser = async (req, res) => {

};

// Define a function that responds with a json response.
// Only logged in users should be able to execute this function

const sendMessage = async (req, res) => {
    //get chat by id
    const chat = await chatService.findChatById(req.params.id)
    //get user by id
    const user = await userService.getUser(req.username)
    //create message
    const message = await messageService.createMessage(user, req.body.msg)
    //add message to chat
    await chatService.addMsgToChat(chat.id, message)

    return res.status(200)

}

const getMessages = async (req, res) => {
    //get chat by id
    const chat = await chatService.findChatById(req.params.id)
    //get the chat's messages
    messages = chat.messages
    return res.status(200).json(messages);
}
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            req.username = data; // Store the data in req.user object

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

module.exports = { createUser, isLoggedIn, sendMessage , getMessages};
