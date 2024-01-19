import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMonthlyYear({ onYearChange }) {
  const [year, setYear] = useState(new Date().getFullYear().toString()); // Set current year as default

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    onYearChange(selectedYear);
  };

  const currentYear = new Date().getFullYear();
  const pastYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="year-select-label">Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={year}
        label="Year"
        onChange={handleChange}
      >
        {pastYears.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
