import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import authService from '../services/auth';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = authService.getToken();
        const response = await axios.get('http://localhost:3000/api/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2>Empresas Registradas</h2>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <p>Nome: {company.name}</p>
            <p>Email: {company.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;