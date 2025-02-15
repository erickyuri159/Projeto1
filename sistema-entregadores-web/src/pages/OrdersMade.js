import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import authService from '../services/auth';

const OrdersMade = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = authService.getToken();
        const response = await axios.get('http://localhost:3000/api/orders/made', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Erro ao buscar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = authService.getToken();
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      setError('Erro ao cancelar pedido');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Pedidos Feitos</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Quantidade: {order.quantity}</p>
            <p>Opção de Entrega: {order.deliveryOption}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.addresses.map((address, index) => (
                <li key={index}>
                  <p>Nome: {address.clientName}</p>
                  <p>Endereço: {address.address}</p>
                  <p>Telefone: {address.phone}</p>
                  <p>Número da Casa: {address.houseNumber}</p>
                  <p>Cidade: {address.city}</p>
                </li>
              ))}
            </ul>
            {order.status !== 'Entregue' && (
              <button onClick={() => handleCancelOrder(order._id)}>Cancelar Pedido</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersMade;