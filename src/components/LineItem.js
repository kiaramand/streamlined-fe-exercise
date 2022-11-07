import React from 'react';
import {
  Button,
  TableRow,
  TableCell,
  TextField
} from '@mui/material';
import closeIcon from '../Icons/streamlinehq-close-interface-essential-48.SVG'

const LineItem = ({ itemId, removeLine, ...other }) => {
  return (
    <TableRow className='line-item'>
      <TableCell>
        <TextField />
      </TableCell>
      <TableCell>
        <TextField />
      </TableCell>
      <TableCell align='right' >
        <TextField />
      </TableCell>
      <TableCell align='right' >
        <TextField />
      </TableCell>
      <TableCell align='right' >amount</TableCell>
      <TableCell className='close-cell'>
        <Button className='close-button' onClick={() => removeLine(itemId)} >
          <img src={closeIcon} className='close-icon' />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LineItem;
