import React from "react";
import { TextField } from "@mui/material";

const TextInput = ({
  label,
  type,
  placeholder,
  defaultValue,
  readOnly,
  onChangeFunction,
  boxColour,
}) => {
  const textFieldSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      background: "#rgba(255, 255, 255, 0.90)",
      border: "none",
      boxShadow: `0px 0px 0px 2px ${boxColour ? boxColour : "#B2B2B2"}`,
      borderRadius: "10px",
      "& fieldset": {
        border: "none",
      },
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
    <TextField
      onChange={(event) => {
        onChangeFunction(event.target.value);
      }}
      id="outlined-basic"
      variant="outlined"
      label={label}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      InputProps={{
        readOnly: readOnly === null ? false : readOnly,
      }}
      sx={textFieldSx}
    />
  );
};

export default TextInput;
