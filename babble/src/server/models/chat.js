const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

const Schema = mongoose.Schema;

const Chat = new Schema({
  id: {
    type: mongoose.Schema.Types.Int32,
    required: true
  },
  users: [
    {
      type: User,
      required: true
    }
  ],
  messages: [
    {
      type: Message,
      required: true
    }
  ]
});

module.exports = mongoose.model('Chat', Chat);
