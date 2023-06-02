const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true
    }
  ]
});

module.exports = mongoose.model('Chat', ChatSchema);
