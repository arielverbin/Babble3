const messageController = require('../controllers/message');

const express = require('express');
const router = express.Router();

router.route('/:id/Messages')
    .post(messageController.isLoggedIn, messageController.sendMessage)
    .get(messageController.isLoggedIn, messageController.getMessages)

module.exports = router;