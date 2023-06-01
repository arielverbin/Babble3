const Chat = require('../models/chat');

const createChat = async (user1, user2) => {

    const chat = new Chat({
        users: [user1, user2]
    });
    chat.id = generateUniqueInt32();
    await chat.save();
    return chat.id;
};

const searchChatsByUser = async (username) => {
    const chats = await Chat.find({
        'users': { $elemMatch: { 'username': username } }
    }).populate('users', 'username displayName profilePic');

    const formattedChats = chats.map(chat => {
        const otherUser = chat.users.find(user => user.username !== username);
        return {
            id: chat.id,
            user: otherUser,
            lastMessage: chat.messages[0]
        };
    });

    return formattedChats;

};

const deleteChat = async (id) => {
    const result = await Chat.deleteOne({ id: id });
    return result
}

const findChatById = async (id) => {
    const chat = await Chat.findOne({id: id})
    return chat
}

const addMsgToChat = async (chat, msg) => {
    await Chat.findOneAndUpdate(
        { id: chatId }, // Filter for the chat based on the chat ID
        { $push: { messages: msg } }, // Add the message to the 'messages' array
      );  
}

module.exports = { createChat, searchChatsByUser , deleteChat, findChatById , addMsgToChat}
