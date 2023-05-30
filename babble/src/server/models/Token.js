// models/Token
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Token = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Token' , Token);

