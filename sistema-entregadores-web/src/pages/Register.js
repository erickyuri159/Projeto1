import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import './Register.css'; // Importe o arquivo CSS

const Register = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [segment, setSegment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setMessage('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um número.');
      setAlertType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        companyName, email, password, cnpj, phone, segment, role: 'company'
      });

      if (response.data) {
        setMessage('Cadastro efetuado com sucesso! Aguarde até 24 horas para a confirmação.');
        setAlertType('success');
        // Redirecionar o usuário para a página de login após um pequeno atraso para mostrar a mensagem de sucesso
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Erro ao registrar. Por favor, tente novamente.');
        setAlertType('error');
      }
    } catch (error) {
      setMessage('Erro ao registrar. Por favor, tente novamente.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2>Registro Empresarial</h2>
      {message && <Alert message={message} type={alertType} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Nome Fantasia"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="CNPJ"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone de Contato"
          required
        />
        <input
          type="text"
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          placeholder="Segmento (ex: Farmácia, Padaria, Supermercado, Correios)"
          required
        />
        <small>*A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um número.</small>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
