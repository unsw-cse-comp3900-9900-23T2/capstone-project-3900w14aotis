import React from "react";
import { useState } from "react";
import styles from "./styles/ProfileImage.module.css";


const ImageInput = () => {
  const [image, setImage] = useState("");

  const handleChange = (image) => {
    console.log(image.target.files);
    setImage(URL.createObjectURL(image.target.files[0]));
  }

  return (
    <div>
      <img src={image} className={styles.imageInput} />
      <input
        type="file"
        onChange={handleChange}
      />
    </div>
  )
}
export default ImageInput;