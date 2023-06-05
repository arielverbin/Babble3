const Chat = require('../models/chat');
const User = require('../models/user');

// Create a new chat between user1 and user2.
const createChat = async (user1, user2) => {
    try {
        const chat = new Chat({
            users: [user1, user2]
        });
        await chat.save();
        return chat._id;
    } catch (error) {
        console.log('Error creaing chat: ' + error);
        return null;
    }
};

const searchChatsByUser = async (username) => {
    //find user.
    const user = await User.findOne({username: username});
    if (!user) {
        return null;
    }

    const chats = await Chat.find({users: user._id}).populate('users').populate('messages');

    return chats.map(chat => {
        const otherUser = chat.users.find(user => user.username !== username);

        return {
            id: chat.id,
            user: otherUser,
            lastMessage: chat.messages[0] || null
        };
    });

};

const searchChatsByIDs = async (user1Id, user2Id) => {
    try {
        return await Chat.find({
            users: {
                $all: [user1Id, user2Id]
            }
        }).populate('users').populate('messages');
    } catch (error) {
        console.log("Error in finding chats: " + error);
        return null;
    }
}

const deleteChat = async (chatId) => {
    return Chat.deleteOne({_id: chatId});
}

const findChatById = async (id) => {
    return Chat.findOne({_id: id}).populate('users')
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                model: 'User'
            }
        });
}

const addMsgToChat = async (chatId, msgID) => {
    try {
        const chat = await Chat.findOne({_id: chatId});
        chat.messages.unshift(msgID);
        await chat.save();
        return 'success';
    } catch (error) {
        console.log("Error in adding message to chat: " + error);
        return null;
    }
}

module.exports = {createChat, searchChatsByIDs, searchChatsByUser, deleteChat, findChatById, addMsgToChat}
