const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    content: String
});

module.exports = mongoose.model('Message', MessageSchema);
