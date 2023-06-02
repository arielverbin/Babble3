const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));

app.use(express.json());

const cors = require('cors');
app.use(cors());

const jwt = require("jsonwebtoken")

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static('public'))

const users = require('./routes/user');
app.use('/api/Users', users);

const chats = require('./routes/chat');
app.use('/api/Chats', chats);

const messages = require('./routes/message');
app.use('/api/:id/Messages', messages);

const token = require('./routes/Token');
app.use('/api/Tokens', token);


app.listen(process.env.PORT);


