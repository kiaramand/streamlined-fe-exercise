import React from 'react';

const CircledIcon = ({ iconSrc, ...other }) => {
  return (
    <div className='circled-icon'>
      <img
        src={iconSrc}
        className='icon'
      />
    </div>
  );
};

export default CircledIcon;
