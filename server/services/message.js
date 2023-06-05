const Message = require('../models/message');

const createMessage = async (user, content) => {
    const message = new Message({
        sender: user,
        content: content
    })
    await message.save();
    return message._id;
};

module.exports = {createMessage}
