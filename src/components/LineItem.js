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
          onChange={(e) => handleLineItemChange(item.itemId, {name: 'name', value: e.target.value})}
        />
      </TableCell>
      <TableCell>
        <TextField
          size='small'
          onChange={(e) => handleLineItemChange(item.itemId, {name: 'description', value: e.target.value})}
        />
      </TableCell>
      <TableCell align='right' >
        <TextField
          size='small'
          type='number'
          inputProps={{min: 0, step: 1}}
          onChange={(e) => {
            handleLineItemChange(item.itemId, {name: 'quantity', value: e.target.value})
            updateLineItemAmount(item.itemId)
          }}
        />
      </TableCell>
      <TableCell align='right' >
        <TextField
          size='small'
          type='number'
          inputProps={{ min: 0, step: 0.01 }}
          onChange={(e) => {
            handleLineItemChange(item.itemId, {name: 'unit_price', value: e.target.value})
            updateLineItemAmount(item.itemId)
          }}
        />
      </TableCell>
      <TableCell align='right' >
        {item.amount && item.amount.toFixed(2)}
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
