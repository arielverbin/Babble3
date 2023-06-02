const Chat = require('../models/message');

const createMessage = async (user , content) => {

    const message = new Message({
        sender: user,
        content: content
    })
    message.id = generateUniqueInt32();
    await message.save();
};

module.exports = { createMessage }
