import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToHomeButton.css'; // Importar o arquivo CSS para estilizar o botão

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-to-home-button" onClick={() => navigate('/')}>
      Voltar à Página Inicial
    </button>
  );
};

export default BackToHomeButton;