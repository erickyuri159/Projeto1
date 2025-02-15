import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import Loading from '../components/Loading';
import './Login.css'; // Importe o arquivo CSS

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Verificar se o email e a senha correspondem ao usuário específico
      if (email === 'erick.bisbalin@hotmail.com' && password === 'Impresora17') {
        await authService.adminLogin(email, password);
        navigate('/role-selection'); // Redirecionar para a página de escolha
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      setError('Ocorreu um erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Administrador</h2>
        {error && <p className="error">{error}</p>}
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
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
