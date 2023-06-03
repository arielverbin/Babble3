// models/Token.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Token = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Token', Token);
