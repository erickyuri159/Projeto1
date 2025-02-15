import React, { useState, useEffect } from 'react';
import './AnimatedLogo.css'; // Certifique-se de que o arquivo CSS está importado

const AnimatedLogo = ({ onAnimationEnd }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onAnimationEnd();
    }, 3000); // Ajuste o tempo de animação conforme necessário

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className={`animated-logo ${isAnimating ? 'animate' : ''}`}>
      <img src="/imagens/logo512.png" alt="Logo" />
    </div>
  );
};

export default AnimatedLogo;