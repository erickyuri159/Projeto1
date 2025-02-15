const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const authenticateAdmin = require('../middleware/authAdminMiddleware');
const AdminController = require('../controllers/adminController');

// Rota para visualizar métricas gerais
router.get('/overview', authenticateToken, authenticateAdmin, AdminController.getOverview);

// Rota para cadastrar uma nova empresa
router.post('/create-company', authenticateToken, authenticateAdmin, AdminController.createCompany);

// Rota para adicionar crédito para uma empresa
router.post('/add-credit', authenticateToken, authenticateAdmin, AdminController.addCredit);

module.exports = router;
