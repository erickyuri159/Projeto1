const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['farmacia', 'lanchonete', 'correios', 'outro'], // Adicione os tipos de empresa que você precisa
  },
  // Outros campos que você possa ter
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;