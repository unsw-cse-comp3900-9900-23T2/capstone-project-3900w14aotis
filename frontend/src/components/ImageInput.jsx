import React from "react";
import { useState } from "react";
import styles from "./styles/ProfileImage.module.css";
import ProfilePicture from "../components/ProfilePicture";
import CoverPicture from "../profile/CoverPicture";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const ImageInput = ({
  type,
  userDetails,
  width,
  height,
  onChangeFunction,
  onDeleteFunction,
}) => {
  const [image, setImage] = useState("");

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
    }}>
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <input
          type="file"
          onChange={onChangeFunction}
        />
        <Button
          sx={{
            width: '50%',
          }}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={onDeleteFunction}
        >
          Delete
        </Button>
        {/* <button
          onClick={onDeleteFunction}
        >
          Delete Image
        </button> */}
      </Box>
    </Box>
  )
}
export default ImageInput;