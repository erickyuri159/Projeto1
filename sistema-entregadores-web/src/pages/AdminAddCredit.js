// src/pages/AdminAddCredit.js
import React, { useState } from 'react';
import authService from '../services/auth';

const AdminAddCredit = () => {
  const [companyId, setCompanyId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.addCredit({ companyId, amount });
      setMessage('Crédito adicionado com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar crédito');
    }
  };

  return (
    <div>
      <h2>Adicionar Crédito para Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID da Empresa:</label>
          <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <button type="submit">Adicionar Crédito</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminAddCredit;
