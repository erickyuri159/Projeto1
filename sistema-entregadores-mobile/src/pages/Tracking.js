import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';

const Tracking = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tracking;
