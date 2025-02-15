const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const authenticateAdmin = require('../middleware/authAdminMiddleware');
const Company = require('../models/Company');

// Rota para cadastrar uma nova empresa (apenas administradores)
router.post('/create', authenticateToken, authenticateAdmin, async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const company = new Company({
      name,
      email,
      address,
    });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error('Erro ao cadastrar empresa:', error);
    res.status(500).json({ message: 'Erro ao cadastrar empresa' });
  }
});

// Rota para buscar todas as empresas
router.get('/companies', authenticateToken, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    res.status(500).json({ message: 'Erro ao buscar empresas' });
  }
});

module.exports = router;
