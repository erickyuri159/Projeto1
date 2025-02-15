import React, { useEffect, useState } from 'react';
import authService from '../services/auth';

const AdminApproveCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await authService.getUnapprovedCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas não aprovadas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const approveCompany = async (userId) => {
    try {
      await authService.approveCompany(userId);
      setMessage('Empresa aprovada com sucesso!');
      setCompanies(companies.filter(company => company._id !== userId));
    } catch (error) {
      setMessage('Erro ao aprovar empresa');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Aprovar Empresas</h2>
      {message && <p>{message}</p>}
      <ul>
        {companies.map(company => (
          <li key={company._id}>
            {company.companyName} - {company.email} - {company.segment}
            <button onClick={() => approveCompany(company._id)}>Aprovar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApproveCompany;
