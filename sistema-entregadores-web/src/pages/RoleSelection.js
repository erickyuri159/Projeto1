import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css'; // Importe o arquivo CSS

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin/overview');
  };

  const handleCompanyClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="role-selection-container">
      <h2>Selecione seu Perfil</h2>
      <div className="buttons-container">
        <button onClick={handleAdminClick} className="role-button admin-button">Administrador</button>
        <button onClick={handleCompanyClick} className="role-button company-button">Empresa</button>
      </div>
    </div>
  );
};

export default RoleSelection;
