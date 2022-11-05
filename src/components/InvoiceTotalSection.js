import React from 'react';

const InvoiceTotalSection = ({ ...other }) => {
  return (
    <div className='flex-column invoice-total-section-wrapper'>
      <div className='flex-column invoice-total-section'>
        <div className='flex-row space-between'>
          <div className='label'>Subtotal</div>
          <div className='value'>$0.00</div>
        </div>
        <div className='clickable-text'>Add discount</div>
        <div className='clickable-text'>Add shipping</div>
        <div className='clickable-text'>Add tax</div>
        <hr className='primary-divider' />
        <div className='flex-row space-between'>
          <div className='label'>Total</div>
          <div className='value'>$0.00</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotalSection;
