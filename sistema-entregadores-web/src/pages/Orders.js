import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import authService from '../services/auth';
import BackToHomeButton from '../components/BackToHomeButton';
import './Orders.css'; // Importar o arquivo CSS para estilizar o formulário

const Orders = () => {
  const [addresses, setAddresses] = useState([{ clientName: '', address: '', phone: '', houseNumber: '', streetName: '', city: '' }]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [orderCreated, setOrderCreated] = useState(false);
  const [clients, setClients] = useState([]); // Inicializar como um array vazio
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = authService.getToken();
        const response = await axios.get('http://localhost:3000/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleQuantityChange = (e) => {
    const selectedQuantity = parseInt(e.target.value, 10);
    setQuantity(selectedQuantity);

    const option = getDeliveryOption(selectedQuantity);
    setDeliveryOption(option);

    // Ajustar o número de campos de endereço com base na quantidade de pedidos
    const newAddresses = Array(selectedQuantity).fill({ clientName: '', address: '', phone: '', houseNumber: '', streetName: '', city: '' });
    setAddresses(newAddresses);
  };

  const getDeliveryOption = (quantity) => {
    if (quantity <= 2) {
      return 'Bicicleta';
    }
    if (quantity <= 5) {
      return 'Moto';
    }
    if (quantity <= 30) {
      return 'Carro';
    }
    return 'Van';
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleClientChange = (index, clientId) => {
    const client = clients.find(client => client._id === clientId);
    if (client) {
      const newAddresses = [...addresses];
      newAddresses[index] = {
        clientName: client.name,
        address: client.address,
        phone: client.phone,
        houseNumber: client.houseNumber,
        streetName: client.streetName,
        city: client.city,
      };
      setAddresses(newAddresses);
    }
  };

  const handleSameHouseChange = (index) => {
    const newAddresses = [...addresses];
    newAddresses[index] = addresses[0]; // Usar o primeiro endereço como "mesma casa"
    setAddresses(newAddresses);
  };

  const addAddressField = (index) => {
    if (addresses.length < quantity) {
      const newAddresses = [...addresses];
      newAddresses.splice(index + 1, 0, { clientName: '', address: '', phone: '', houseNumber: '', streetName: '', city: '' }); // Adicionar um novo campo de endereço após o índice atual
      setAddresses(newAddresses);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = authService.getToken();
      const response = await axios.post('http://localhost:3000/api/orders/create', {
        quantity,
        addresses,
        deliveryOption,
        status: 'Encontrando um entregador',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setMessage('Pedido criado com sucesso!');
        setAlertType('success');
        setOrderCreated(true); // Definir que o pedido foi criado
      } else {
        setMessage('Erro ao criar pedido. Por favor, tente novamente.');
        setAlertType('error');
      }
    } catch (error) {
      setMessage('Erro ao criar pedido. Por favor, tente novamente.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2>Criar Pedido</h2>
      {message && <Alert message={message} type={alertType} />}
      {orderCreated ? (
        <div>
          <p>Pedido confirmado!</p>
          <button onClick={() => navigate('/orders-made')}>Ir para Pedidos Feitos</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="quantity">Quantidade de Pedidos</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Quantidade de Pedidos"
              required
            />
          </div>
          {deliveryOption && (
            <div className="form-group">
              <h3>Opção de Entrega Selecionada</h3>
              <p>{deliveryOption}</p>
            </div>
          )}
          {addresses.map((address, index) => (
            <div key={index} className="address-group">
              <h4>Endereço {index + 1}</h4>
              <div className="form-group">
                <label htmlFor={`clientSelect${index}`}>Cliente já cadastrado</label>
                <select
                  id={`clientSelect${index}`}
                  onChange={(e) => handleClientChange(index, e.target.value)}
                >
                  <option value="">Selecione um cliente</option>
                  {Array.isArray(clients) && clients.map(client => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={`clientName${index}`}>Nome do Cliente</label>
                <input
                  type="text"
                  id={`clientName${index}`}
                  value={address.clientName}
                  onChange={(e) => handleAddressChange(index, 'clientName', e.target.value)}
                  placeholder="Nome do Cliente"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`address${index}`}>Endereço</label>
                <input
                  type="text"
                  id={`address${index}`}
                  value={address.address}
                  onChange={(e) => handleAddressChange(index, 'address', e.target.value)}
                  placeholder="Endereço"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`phone${index}`}>Telefone</label>
                <input
                  type="text"
                  id={`phone${index}`}
                  value={address.phone}
                  onChange={(e) => handleAddressChange(index, 'phone', e.target.value)}
                  placeholder="Telefone"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`houseNumber${index}`}>Número da Casa</label>
                <input
                  type="text"
                  id={`houseNumber${index}`}
                  value={address.houseNumber}
                  onChange={(e) => handleAddressChange(index, 'houseNumber', e.target.value)}
                  placeholder="Número da Casa"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`streetName${index}`}>Nome da Rua</label>
                <input
                  type="text"
                  id={`streetName${index}`}
                  value={address.streetName}
                  onChange={(e) => handleAddressChange(index, 'streetName', e.target.value)}
                  placeholder="Nome da Rua"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`city${index}`}>Cidade</label>
                <input
                  type="text"
                  id={`city${index}`}
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  placeholder="Cidade"
                  required
                />
              </div>
              {index > 0 && (
                <div className="form-group">
                  <label>
                    <input
                      type="radio"
                      name={`addressOption${index}`}
                      onChange={() => handleSameHouseChange(index)}
                    />
                    Mesma casa
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`addressOption${index}`}
                      onChange={() => addAddressField(index)}
                    />
                    Novo endereço
                  </label>
                </div>
              )}
            </div>
          ))}
          <button type="submit">Criar Pedido</button>
        </form>
      )}
      <BackToHomeButton />
    </div>
  );
};

export default Orders;