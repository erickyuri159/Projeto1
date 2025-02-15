// src/pages/AdminCreateCompany.js
import React, { useState } from 'react';
import authService from '../services/auth';

const AdminCreateCompany = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createCompany({ name, email, address });
      setMessage('Empresa cadastrada com sucesso!');
    } catch (error) {
      setMessage('Erro ao cadastrar empresa');
    }
  };

  return (
    <div>
      <h2>Cadastrar Nova Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Endereço:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCreateCompany;
