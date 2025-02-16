const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/register', register);
router.post('/approve-company', approveCompany);
router.get('/unapproved-companies', getUnapprovedCompanies);

module.exports = router;
