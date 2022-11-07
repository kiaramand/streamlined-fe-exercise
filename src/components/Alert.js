import React from 'react';

const Alert = ({ type, ...other }) => {
  return (
    <div className={`alert alert-${type}`}>
      <img src='' />
      <div>Form contains error. Please correct them and try again.</div>
    </div>
  );
};

export default Alert;
