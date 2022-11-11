import React from 'react';
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

const calculateTotal = ( discountType, discount, subtotal, shipping, tax ) => {
  let total = subtotal;
  if (discountType === 'percent' && discount > 0) {
    total = total * discount;
  } else if (discountType === 'dollar') {
    total = total - discount;
  }
  return total + tax + shipping;
}

const calculateSubtotal = ( lineItems ) => {
  return lineItems.reduce((prev, curr) => {
    if (curr.amount !== null) {
      return prev + parseInt(curr.amount);
    }
    return prev;
  }, 0)
}

const InvoiceTotalSection = (
  {
    showHiddenSection,
    discountShown,
    shippingShown,
    taxShown,
    discountType,
    discount,
    shipping,
    tax,
    lineItems,
    handleChange,
    ...other
  }) => {

  const subtotal = calculateSubtotal(lineItems)

  return (
    <div className='flex-column invoice-total-section-wrapper'>
      <div className='flex-column invoice-total-section'>
        <div className='flex-row space-between'>
          <div className='label'>Subtotal</div>
          <div className='value'>${subtotal}</div>
        </div>
        {discountShown ? (
          <div className='flex-row space-between'>
            <div className='label'>Discount</div>
            <div>
              <ToggleButtonGroup
                value={discountType}
                onChange={(e) => handleChange({value: e.target.value, name: 'discountType'})}
                size='small'
              >
                <ToggleButton value="dollar">
                  $
                </ToggleButton>
                <ToggleButton value="percent">
                  %
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField
                className='input'
                type='number'
                inputProps={{ min: 0 }}
                onChange={(e) => handleChange({ value: parseInt(e.target.value), name: 'discount'})}
                InputProps={{ startAdornment: <InputAdornment position="start">{discountType === "dollar" ? "$" : "%"}</InputAdornment> }}
              />
            </div>
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={() => showHiddenSection('discountShown')}
          >
            Add discount
          </div>
        )}
        {shippingShown ? (
          <div className='flex-row space-between'>
            <div className='label'>shipping</div>
            <TextField
              className='input'
              type='number'
              onChange={(e) => handleChange({ value: parseInt(e.target.value), name: 'shipping' })}
              inputProps={{ min: 0 }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={() => showHiddenSection('shippingShown')}
          >
            Add shipping
          </div>
        )}
        {taxShown ? (
          <div className='flex-row space-between'>
            <div className='label'>tax</div>
            <TextField
              className='input'
              type='number'
              onChange={(e) => handleChange({ value: parseInt(e.target.value), name: 'tax' })}
              inputProps={{ min: 0 }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </div>
        ) : (
          <div
            className='clickable-text'
            onClick={() => showHiddenSection('taxShown')}
          >
            Add tax
          </div>
        )}
        <hr className='primary-divider' />
        <div className='flex-row space-between'>
          <div className='label'>Total</div>
          <div className='value'>${calculateTotal(discountType, discount, subtotal, shipping, tax)}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotalSection;
