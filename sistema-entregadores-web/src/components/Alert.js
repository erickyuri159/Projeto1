import React from 'react';

const Alert = ({ message, type }) => {
  const alertType = type === 'success' ? 'alert-success' : 'alert-error';

  return (
    <div className={`alert ${alertType}`}>
      {message}
    </div>
  );
};

export default Alert;
