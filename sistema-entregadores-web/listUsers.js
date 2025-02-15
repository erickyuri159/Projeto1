const mongoose = require('mongoose');
const path = require('path');
const User = require(path.join(__dirname, '../backend/models/User')); // Ajuste o caminho para o modelo User

const listUsers = async () => {
  try {
    await mongoose.connect('mongodb+srv://erickbisbalin20:Impresora17-@cluster0.zuqac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find({});
    console.log('Usuários:', users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
  } finally {
    mongoose.connection.close();
  }
};

listUsers();