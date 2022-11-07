import React from 'react';
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

const InvoiceTotalSection = ({ showDiscount, showShipping, showTax, discountShown, shippingShown, taxShown, ...other }) => {
  return (
    <div className='flex-column invoice-total-section-wrapper'>
      <div className='flex-column invoice-total-section'>
        <div className='flex-row space-between'>
          <div className='label'>Subtotal</div>
          <div className='value'>$0.00</div>
        </div>
        {discountShown ? (
          <div className='flex-row space-between'>
            <div className='label'>Discount</div>
            <div>
              <ToggleButtonGroup>
                <ToggleButton value="dollar">
                  $
                </ToggleButton>
                <ToggleButton value="percent">
                  %
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField
                className='input'
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </div>
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={showDiscount}
          >
            Add discount
          </div>
        )}
        {shippingShown ? (
          <div className='flex-row space-between'>
            <div className='label'>shipping</div>
            <TextField
              className='input'
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={showShipping}
          >
            Add shipping
          </div>
        )}
        {taxShown ? (
          <div className='flex-row space-between'>
            <div className='label'>tax</div>
            <TextField
              className='input'
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={showTax}
          >
            Add tax
          </div>
        )}
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
