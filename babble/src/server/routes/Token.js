// routes/Token.js
const express = require('express');
const TokenController = require('../controllers/Token');
const AuthService = require('../services/AuthService');

const router = express.Router();
const authService = new AuthService();
const tokenController = new TokenController();

router.post('/', tokenController.login);

module.exports = router;


/*
server.post(‘/api/Tokens’, (req, res) =>{
    //logic of login where arguments are
    req.body.username, req.body.password
    
    Should return: 404 if not found, 200 for success
    }*/