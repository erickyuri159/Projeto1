import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importe o arquivo CSS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/ocultar senha
//import authService from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const words = ['ELA', 'Entrega', 'Logo Ai!', 'Vai!'];
    const wordContainer = document.querySelector('.word-container');

    setInterval(() => {
      const word = document.createElement('span');
      word.className = 'animated-word';
      word.innerText = words[Math.floor(Math.random() * words.length)];
      word.style.left = `${Math.random() * 100}%`;
      word.style.top = `${Math.random() * 100}%`;
      wordContainer.appendChild(word);

      setTimeout(() => {
        word.remove();
      }, 3000);
    }, 1000);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
          navigate('/role-selection'); // Redirecionar para a página de escolha
    
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <div className="word-container"></div> {/* Contêiner para palavras animadas */}
      <div className="login-form">
        <h2>Login</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group">
            <label>Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;