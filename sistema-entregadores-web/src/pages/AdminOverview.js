// src/pages/AdminOverview.js
import React, { useEffect, useState } from 'react';
import authService from '../services/auth';

const AdminOverview = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await authService.getAdminOverview();
        setOverview(response.data);
      } catch (error) {
        console.error('Erro ao buscar visão geral:', error);
      }
    };
    fetchOverview();
  }, []);

  if (!overview) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Visão Geral</h2>
      <p>Total de Empresas: {overview.companyCount}</p>
      <p>Ganhos Totais: {overview.totalEarnings}</p>
      {/* Adicione mais métricas conforme necessário */}
    </div>
  );
};

export default AdminOverview;
