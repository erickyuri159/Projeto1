const Order = require('../models/Order');
const User = require('../models/User');

// Criar Pedido
exports.createOrder = async (req, res) => {
  const { company, address } = req.body;
  try {
    const newOrder = new Order({ company, address, status: 'pending' });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar Pedidos Pendentes
exports.getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'pending' }).populate('company');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aceitar Pedido
exports.acceptOrder = async (req, res) => {
  const { orderId } = req.params;
  const { delivererId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = 'accepted';
    order.deliverer = delivererId;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
