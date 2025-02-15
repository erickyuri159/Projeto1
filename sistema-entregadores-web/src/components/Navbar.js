import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Certifique-se de criar um arquivo CSS para estilizar o menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/orders">Novo Pedido</Link>
        <Link to="/orders-made">Pedidos Feitos</Link>
        <Link to="/completed-routes">Rotas Concluídas</Link>
        <Link to="/buy-credits">Comprar Mais Créditos</Link>
        <Link to="/daily-analysis">Análise Diária</Link>
      </div>
    </nav>
  );
};

export default Navbar;