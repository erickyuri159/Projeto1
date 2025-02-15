const express = require('express');
const router = express.Router();
const { login, adminLogin, register, approveCompany, getUnapprovedCompanies } = require('../controllers/authController');

router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/register', register);
router.post('/approve-company', approveCompany);
router.get('/unapproved-companies', getUnapprovedCompanies);

module.exports = router;
