import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import authService from '../services/auth';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = authService.getToken();
        const data = await apiService.getPendingOrders(token);
        setOrders(data);
      } catch (error) {
        setError('Erro ao buscar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const token = authService.getToken();
      const delivererId = authService.getCurrentUser().id;
      await apiService.acceptOrder(orderId, delivererId, token);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      setError('Erro ao aceitar pedido');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Pedidos Pendentes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Quantidade: {order.quantity}</p>
            <p>Opção de Entrega: {order.deliveryOption}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => handleAcceptOrder(order._id)}>Aceitar Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingOrders;