import React from 'react';

const CircledIcon = ({ iconSrc, status, ...other }) => {
  return (
    <div className={`circled-icon ${status === 'error' && 'error-icon'}`}>
      <img
        src={iconSrc}
        className='icon'
      />
    </div>
  );
};

export default CircledIcon;
