import React from "react";
import { useState, useRef } from "react";
import styles from "./styles/Profile.module.css";
import ProfilePicture from "../components/ProfilePicture";
import CoverPicture from "../profile/CoverPicture";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';

const ImageInput = ({
  type,
  userDetails,
  width,
  height,
  onChangeFunction,
  onDeleteFunction,
}) => {
  const [image, setImage] = useState("");

  const fileInput = useRef(null)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
      }}
    >
      {type === "PROFILE" ? (
        <ProfilePicture
          userDetails={userDetails}
          imgWidth={width}
          imgHeight={height}
        />
      ) : (
        <CoverPicture
          userDetails={userDetails}
          imgWidth={width}
          imgHeight={height}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* <input type="file" onChange={onChangeFunction} /> */}
        <input
          type='file'
          name='image'
          ref={fileInput}
          onChange={onChangeFunction}
          style={{ display: 'none' }}
        />
        <button
          className={styles.fileInputButton}
          onClick={() => fileInput.current.click()}
        >Upload Image</button>
        {/* <Button
          sx={{
            width: "50%",
          }}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={onDeleteFunction}
        >
          Delete
        </Button> */}
        <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" onClick={onDeleteFunction} />
          
        </IconButton>
      </Box>
    </Box>
  );
};
export default ImageInput;
