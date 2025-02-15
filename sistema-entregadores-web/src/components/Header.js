import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importe o arquivo CSS para o cabeçalho

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="path/to/logo.png" alt="Logo" /> {/* Substitua pelo caminho para o seu logotipo */}
        </Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/HomeLogin">Home</Link></li>
          <li><Link to="/Contact">Fale Conosco</Link></li>
          <li><Link to="/Register">Registrar</Link></li> {/* Botão Registrar */}
          <li><Link to="/Login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
