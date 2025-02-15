const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addresses: [
    {
      clientName: String,
      address: String,
      phone: String,
      houseNumber: String,
      streetName: String,
      city: String,
    },
  ],
  deliveryOption: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;