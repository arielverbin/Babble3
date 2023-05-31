const userController = require('../controllers/user');

const express = require('express');
const user = require('../models/user');
var router = express.Router();

router.route('/')
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser , userController.afterTokenGetUser);
module.exports = router;