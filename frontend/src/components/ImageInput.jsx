import React from "react";
import { useState } from "react";
import styles from "./styles/ProfileImage.module.css";
import ProfilePicture from "../components/ProfilePicture";
import CoverPicture from "../profile/CoverPicture";


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
    <div>
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
      
      <input
        type="file"
        onChange={onChangeFunction}
      />
      <button
        onClick={onDeleteFunction}
      >
        Delete Image
      </button>
    </div>
  )
}
export default ImageInput;