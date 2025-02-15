import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}orders/create`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getPendingOrders = async (token) => {
  const response = await axios.get(`${API_URL}orders/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const acceptOrder = async (orderId, delivererId, token) => {
  const response = await axios.post(`${API_URL}orders/${orderId}/accept`, { delivererId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const apiService = {
  createOrder,
  getPendingOrders,
  acceptOrder,
};

export default apiService;