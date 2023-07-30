import styles from "./styles/ProfileModal.module.css";

const UploadImageButton = ({ fileInput }) => {
  return (
    <button
      className={styles.fileInputButton}
      onClick={() => fileInput.current.click()}
    >Upload Image</button>
  );
};
export default UploadImageButton;