import React from 'react';
import {
  Button,
  TableRow,
  TableCell,
  TextField
} from '@mui/material';
import closeIcon from '../Icons/streamlinehq-close-interface-essential-48.SVG'

const LineItem = ({ item, removeLine, handleLineItemChange, updateLineItemAmount, ...other }) => {
  return (
    <TableRow className='line-item'>
      <TableCell>
        <TextField
          size='small'
          name='name'
          value={item.name}
          error={item.errors['name']}
          onChange={(e) => handleLineItemChange(item.itemId, e.target)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size='small'
          name='description'
          value={item.description}
          onChange={(e) => handleLineItemChange(item.itemId, e.target)}
        />
      </TableCell>
      <TableCell align='right' >
        <TextField
          size='small'
          name='quantity'
          type='number'
          error={item.errors['quantity']}
          inputProps={{min: 0, step: 1}}
          value={item.quantity}
          onChange={(e) => {
            handleLineItemChange(item.itemId, e.target)
            updateLineItemAmount(item.itemId)
          }}
        />
      </TableCell>
      <TableCell align='right' >
        <TextField
          size='small'
          name='unit_price'
          type='number'
          error={item.errors['unit_price']}
          inputProps={{ min: 0 }}
          value={item.unit_price}
          onChange={(e) => {
            handleLineItemChange(item.itemId, e.target)
            updateLineItemAmount(item.itemId)
          }}
        />
      </TableCell>
      <TableCell align='right' >
        {item.amount}
      </TableCell>
      <TableCell className='close-cell'>
        <Button className='close-button' onClick={() => removeLine(item.itemId)} >
          <img src={closeIcon} className='close-icon' />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LineItem;
