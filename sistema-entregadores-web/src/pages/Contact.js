import React from 'react';
import './Contact.css'; // Importe o arquivo CSS

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Fale Conosco</h1>
      <p>Entre em contato conosco através dos seguintes meios:</p>
      <ul>
        <li>Email: contato@meuapp.com</li>
        <li>Telefone: (21) 1234-5678</li>
      </ul>
    </div>
  );
};

export default Contact;
