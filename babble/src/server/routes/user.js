const userController = require('../controllers/user');

const express = require('express');
const user = require('../models/user');
var router = express.Router();

router.route('/')
    .get(userController.getUser)
    .post(userController.createUser);
module.exports = router;