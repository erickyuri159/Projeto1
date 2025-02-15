const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.createUser);

// Outras rotas (login, update, delete) podem ser adicionadas aqui

module.exports = router;
