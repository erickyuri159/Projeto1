const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Rota para criar um pedido
router.post('/create', authenticateToken, async (req, res) => {
  const { quantity, addresses, deliveryOption, status } = req.body;

  try {
    const order = new Order({
      company: req.user.id,
      quantity,
      addresses,
      deliveryOption,
      status,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
});

module.exports = router;