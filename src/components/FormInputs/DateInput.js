import React from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs';

const DateInput = ({ due_date, handleChange, error, ...other }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className='date-input'
        value={due_date}
        onChange={(e) => handleChange({value: dayjs(e).format(), name: 'due_date'})}
        renderInput={(params) => <TextField  {...params} size='small' error={error} />}
      />
    </LocalizationProvider>
  )
}

export default DateInput
