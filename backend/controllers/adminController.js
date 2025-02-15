const Company = require('../models/Company');
const Transaction = require('../models/Transaction'); // Suponha que você tenha um modelo para transações

// Função para obter a visão geral
exports.getOverview = async (req, res) => {
  try {
    const companyCount = await Company.countDocuments();
    const totalEarnings = await Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
    const companies = await Company.find().populate('transactions');

    res.status(200).json({
      companyCount,
      totalEarnings: totalEarnings[0] ? totalEarnings[0].total : 0,
      companies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para criar uma nova empresa
exports.createCompany = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const company = new Company({ name, email, address });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para adicionar crédito a uma empresa
exports.addCredit = async (req, res) => {
  const { companyId, amount } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    // Suponha que você tenha uma lógica para adicionar crédito
    // company.balance += amount;
    // await company.save();

    res.status(200).json({ message: 'Crédito adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
