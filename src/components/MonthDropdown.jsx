import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [month, setMonth] = React.useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Month</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={month}
        label="Month"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {months.map((month, index) => (
          <MenuItem key={index} value={index + 1}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
