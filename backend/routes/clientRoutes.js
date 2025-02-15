const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Client = require('../models/Client');

// Rota para buscar todos os clientes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const clients = await Client.find({ company: req.user.id });
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
});

module.exports = router;