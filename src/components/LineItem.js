import React from 'react';
import {
  Button,
  TableRow,
  TableCell
} from '@mui/material';
import closeIcon from '../Icons/streamlinehq-close-interface-essential-48.SVG'

const LineItem = ({ itemId, removeLine, ...other }) => {
  return (
    <TableRow className='line-item'>
      <TableCell>items input {itemId}</TableCell>
      <TableCell>description input</TableCell>
      <TableCell align='right' >quantity input</TableCell>
      <TableCell align='right' >price input</TableCell>
      <TableCell align='right' >amount input</TableCell>
      <TableCell className='close-cell'>
        <Button className='close-button' onClick={() => removeLine(itemId)} >
          <img src={closeIcon} className='close-icon' />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LineItem;
