import React from 'react';
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

const calculateTotal = ( discountType, discount_amount, discount_percentage, subtotal, shipping, tax ) => {
  let total = subtotal;
  if (discountType === 'percent' && discount_percentage > 0) {
    total = total * ((100 - discount_percentage)/100);
  } else if (discountType === 'dollar') {
    total = total - discount_amount;
  }
  return total + tax + shipping;
}

const calculateSubtotal = ( line_items ) => {
  return line_items.reduce((prev, curr) => {
    if (curr.amount !== null) {
      return prev + Number(curr.amount);
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
    discount_amount,
    discount_percentage,
    shipping,
    tax,
    line_items,
    handleChange,
    ...other
  }) => {

  const subtotal = calculateSubtotal(line_items)

  return (
    <div className='flex-column invoice-total-section-wrapper'>
      <div className='flex-column invoice-total-section'>
        <div className='flex-row space-between'>
          <div className='label'>Subtotal</div>
          <div className='value'>${subtotal.toFixed(2)}</div>
        </div>
        {discountShown ? (
          <div className='flex-row space-between'>
            <div className='label'>Discount</div>
            <div>
              <ToggleButtonGroup
                className='toggle-group'
                value={discountType}
                onChange={(e) => handleChange({value: e.target.value, name: 'discount_type'})}
                size='small'
              >
                <ToggleButton value="dollar">
                  $
                </ToggleButton>
                <ToggleButton value="percent">
                  %
                </ToggleButton>
              </ToggleButtonGroup>
              {discountType === 'dollar' ? (
                <TextField
                  key='discount_amount'
                  size='small'
                  className='input'
                  type='number'
                  inputProps={{ min: 0, step: 0.01 }}
                  onChange={(e) => handleChange({ value: Number(e.target.value), name: 'discount_amount' })}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              ):(
                  <TextField
                    key='discount_percentage'
                    size='small'
                    className='input'
                    type='number'
                    inputProps={{ min: 0, step: 1 }}
                    onChange={(e) => handleChange({ value: Number(e.target.value), name: 'discount_percentage' })}
                    InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  />
              )}
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
              size='small'
              className='input'
              type='number'
              onChange={(e) => handleChange({ value: Number(e.target.value), name: 'shipping_amount' })}
              inputProps={{ min: 0, step: 0.01 }}
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
              size='small'
              className='input'
              type='number'
              onChange={(e) => handleChange({ value: Number(e.target.value), name: 'tax_amount' })}
              inputProps={{ min: 0, step: 0.01 }}
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
          <div className='value'>${calculateTotal(discountType, discount_amount, discount_percentage, subtotal, shipping, tax).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotalSection;
