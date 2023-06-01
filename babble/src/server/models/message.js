const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;
const Massage = new Schema({
    id: {
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
    sender: {
        type: User,
        default: null
    },
    content: String
});

module.exports = mongoose.model('Massage', Massage);

