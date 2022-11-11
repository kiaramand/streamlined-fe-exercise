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
          name='name'
          value={item.name}
          onChange={(e) => handleLineItemChange(item.itemId, e.target)}
        />
      </TableCell>
      <TableCell>
        <TextField
          name='description'
          value={item.description}
          onChange={(e) => handleLineItemChange(item.itemId, e.target)}
        />
      </TableCell>
      <TableCell align='right' >
        <TextField
          name='quantity'
          type='number'
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
          name='unit_price'
          type='number'
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
