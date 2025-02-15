const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require(path.join(__dirname, '../backend/models/User')); // Ajuste o caminho para o modelo User

const createAdmin = async () => {
  const email = 'erick.bisbalin@hotmail.com';
  const password = 'Impresora17';
  const role = 'admin';

  try {
    await mongoose.connect('mongodb+srv://erickbisbalin20:Impresora17-@cluster0.zuqac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Usuário já existe');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      email,
      password: hashedPassword,
      role,
    });

    await admin.save();
    console.log('Administrador criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();