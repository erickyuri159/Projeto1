import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import authService from '../services/auth';

const CompanyTicker = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = authService.getToken();
        const companies = await apiService.getCompanies(token);
        console.log('API Response:', companies);
        if (Array.isArray(companies)) {
          setCompanies(companies);
        } else {
          setError('Dados inválidos recebidos da API');
        }
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        setError('Erro ao buscar empresas');
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    console.log('Companies state:', companies);
  }, [companies]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {companies.map((company) => (
        <div key={company._id}>
          <h3>{company.name}</h3>
          <p>{company.address}</p>
        </div>
      ))}
    </div>
  );
};

export default CompanyTicker;
