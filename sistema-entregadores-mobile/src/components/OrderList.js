import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
      keyExtractor={(item) => item._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default OrderList;
