import React from 'react';

const ErrorMessage = ({ message }) => {
  return <div style={{ color: 'red' }}>Error: {message || 'An error occurred.'}</div>;
};

export default ErrorMessage;