import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import axios from 'axios';
import AuthService from '../services/auth';

const OrderItem = ({ order }) => {
  const handleAccept = async () => {
    try {
      const user = AuthService.getCurrentUser();
      const response = await axios.post(`http://localhost:3000/api/orders/${order._id}/accept`, {
        delivererId: user.userId,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log('Order Accepted:', response.data);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.address}>Endereço: {order.address}</Text>
      <Text style={styles.company}>Empresa: {order.company.name}</Text>
      <Button title="Aceitar Pedido" onPress={handleAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#555',
  },
});

export default OrderItem;
