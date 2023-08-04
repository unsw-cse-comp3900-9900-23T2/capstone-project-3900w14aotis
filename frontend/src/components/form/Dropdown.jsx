import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * This is the dropdown component used when choosing a task
 * priority when creating a task.
 */
const DropDown = ({
  label,
  options,
  onChangeFunction,
  defaultStatus,
  isRequired,
}) => {
  const [value, setValue] = useState(defaultStatus);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChangeFunction(event.target.value);
  };

  const dropdownSx = {
    width: "30%",
    "& .MuiOutlinedInput-root": {
      background: "#rgba(255, 255, 255, 0.90)",
      border: "none",
      borderRadius: "10px",
      height: "60px",
    },
    "& .MuiInputBase-input": {
      fontSize: 20,
      padding: "20px 20px",
      fontFamily: "Cairo",
      color: "#454545",
    },
    "& label": {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      fontSize: 22,
      fontFamily: "Cairo",
      padding: "0 10px 0 10px",
      color: "#A4A4A4",
    },
    "& label.Mui-focused": {
      color: "#2684FF",
    },
  };

  return (
    <Box sx={dropdownSx}>
      <FormControl fullWidth required={isRequired}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;