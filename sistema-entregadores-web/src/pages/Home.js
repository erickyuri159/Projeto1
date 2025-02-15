import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanyTicker from '../components/CompanyTicker';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import Navbar from '../components/Navbar';
import authService from '../services/auth';
import BackToHomeButton from '../components/BackToHomeButton';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setMessage('Erro ao carregar os dados. Por favor, tente novamente.');
        setAlertType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Navbar />
      <h2>Bem-vindo ao Sistema de Entregadores</h2>
      <CompanyTicker />
      {message && <Alert message={message} type={alertType} />}
      <button onClick={() => navigate('/orders')}>Criar Novo Pedido</button>
      <h3>Pedidos Efetuados</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Quantidade: {order.quantity}</p>
            <p>Endereços: {order.addresses.join(', ')}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
      <BackToHomeButton />
    </div>
  );
};

export default Home;
