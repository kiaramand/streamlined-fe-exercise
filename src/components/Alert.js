import React from 'react';
import { Paper } from '@mui/material';
import alertIcon from '../Icons/streamlinehq-alert-circle-interface-essential-48.SVG'
import CircledIcon from './CircledIcon';

const Alert = ({ type, ...other }) => {
  return (
    <Paper
      variant='outlined'
      className={`flex-row form-container alert alert-${type}`}
    >
      <CircledIcon iconSrc={alertIcon} status={type} />
      <div>Form contains error. Please correct them and try again.</div>
    </Paper>
  );
};

export default Alert;
