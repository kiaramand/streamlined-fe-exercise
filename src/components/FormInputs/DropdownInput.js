import React from "react";
import {
  FormControl,
  MenuItem,
  Select
} from '@mui/material';

const DropdownInput = ({ terms, defaultTerms, handleChange, ...other }) => {

  return (
    <FormControl fullWidth>
      <Select
        value={terms !== null ? terms : defaultTerms}
        name='terms'
        onChange={(e) => handleChange(e.target)}
      >
        <MenuItem value={7}>{`Net 7 ${defaultTerms === 7 ? '(Default)' : ''}`}</MenuItem>
        <MenuItem value={15}>{`Net 15 ${defaultTerms === 15 ? '(Default)' : ''}`}</MenuItem>
        <MenuItem value={30}>{`Net 30 ${defaultTerms === 30 ? '(Default)' : ''}`}</MenuItem>
        <MenuItem value={60}>{`Net 60 ${defaultTerms === 60 ? '(Default)' : ''}`}</MenuItem>
        <MenuItem value={0}>{`Custom Terms ${defaultTerms === 0 ? '(Default)' : ''}`}</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DropdownInput;
