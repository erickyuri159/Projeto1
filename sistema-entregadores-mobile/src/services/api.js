import * as Notifications from 'expo-notifications';

const sendPushNotification = async (expoPushToken, message) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Pedido Aceito',
    body: message,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
