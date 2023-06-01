const chatController = require('../controllers/chat');

const express = require('express');
const user = require('../models/chat');
var router = express.Router();

router.route('/')
    .get(chatController.isLoggedIn, chatController.getChatsByUser)
    .post(chatController.isLoggedIn, chatController.addChat);

    router.route('/:id')
    .delete(chatController.isLoggedIn, chatController.deleteChat)
module.exports = router;