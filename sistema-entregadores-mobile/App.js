import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Orders from './src/pages/Orders';
import Tracking from './src/pages/Tracking';
import useNotifications from './src/hooks/useNotifications';

const Stack = createStackNavigator();

export default function App() {
  useNotifications();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Tracking" component={Tracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
