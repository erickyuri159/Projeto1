const User = require('../models/User');
const bcrypt = require('bcrypt');

// Listar Empresas
exports.listCompanies = async (req, res) => {
  try {
    const companies = await User.find({ role: 'company' });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Adicionar Empresas Fictícias
exports.addDummyCompanies = async (req, res) => {
  try {
    const dummyCompanies = [
      { name: 'Empresa A', email: 'contato@empresaa.com', password: 'SenhaA1', role: 'company' },
      { name: 'Empresa B', email: 'contato@empresab.com', password: 'SenhaB1', role: 'company' },
      { name: 'Empresa C', email: 'contato@empresac.com', password: 'SenhaC1', role: 'company' },
    ];

    for (const company of dummyCompanies) {
      const hashedPassword = await bcrypt.hash(company.password, 10);
      const user = new User({ ...company, password: hashedPassword });
      await user.save();
    }

    res.status(201).json({ message: 'Dummy companies added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
