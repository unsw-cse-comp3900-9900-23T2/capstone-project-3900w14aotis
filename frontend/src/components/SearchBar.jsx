import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";

const SearchBar = ({ type, placeholder, defaultValue, onChangeFunction }) => {
  const textFieldSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      background: "rgba(0, 0, 0, 0.20)",
      border: "none",
      borderRadius: "0.625rem",
      "& fieldset": {
        border: "none",
      },
      height: "3.125rem",
    },
    "& .MuiInputBase-input": {
      fontSize: 20,
      padding: "20px 20px 20px 0px",
      fontFamily: "Raleway",
      color: "#FFFFFF",
    },
    "& label.Mui-focused": {
      color: "#2684FF",
    },
  };
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(event) => {
        onChangeFunction(event.target.value);
      }}
      sx={textFieldSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              icon="ic:round-search"
              style={{ fontSize: "30px", color: "#A4A4A4" }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
