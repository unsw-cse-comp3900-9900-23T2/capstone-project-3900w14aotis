import { Modal, Fade, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./styles/profileModal.module.css";
import TextInput from "./TextInput";
import TextField from '@mui/material/TextField';
import ImageInput from "./ImageInput";
import { getAuth } from "firebase/auth";
import { displayError, displaySuccess } from "../utils/helpers";
import { profileUpdateFetch } from "../api/profile.js";
import CustomButton from "./CustomButton";




const UpdateProfileModal = () => {
  // Get profile details
  const currFirstName = "Sophia";
  const currLastName = "Li";
  const currEmail = "sophiali@gmail.com";
  const currProfileImage = "";
  const currCoverImage = "";


  // Initialise profile details
  const [firstName, setFirstName] = useState(currFirstName);
  const [lastName, setLastName] = useState(currLastName);
  const [email, setEmail] = useState(currEmail);
  const [profileImage, setProfileImage] = useState(currProfileImage);
  const [coverProfileImage, setCoverProfileImage] = useState(currCoverImage);

  // TODO: pasword change -> old password needs to match
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordColour, setPasswordColour] = useState("#B2B2B2");


  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);

  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangeProfileImage = (value) => setProfileImage(value);
  const onChangeCoverProfileImage = (value) => setCoverProfileImage(value);
  const onChangeOldPassword = (value) => setOldPassword(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);

  const profileUpdateButtonHandler = async () => {
    try {
      const user = getAuth();
      const profileUpdateFetchResponse = await profileUpdateFetch(
        user.currentUser.uid,
        firstName,
        lastName,
        email,
        profileImage,
        coverProfileImage
      );
      console.log(profileUpdateFetchResponse);
      closeModalHandler();
      displaySuccess(`Profile Updated Successfully!`);
    } catch (error) {
      displayError(`${error.message}`);
    }
  };


  const modalContainerSx = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "15px",
  };

  const modalTitleSx = {
    display: "flex",
    flexDirection: "row",
    gap: "78%",
    justifyContent: "center",
    // TODO: center text
  };

  const inputContainerSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px",
  };

  const saveChangesButtonSx = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <EditIcon
        onClick={openModalHandler}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModalHandler}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalContainerSx}>
            <Box sx={modalTitleSx}>
              <h2>Edit Profile</h2>
              <Icon
                icon="iconamoon:close-bold"
                onClick={closeModalHandler}
                style={{ fontSize: "36px" }}
                className={styles.clickButton}
              />
            </Box>
            <Box sx={inputContainerSx}>
              <h3>Profile Image:</h3>
              <ImageInput />
            </Box>
            <Box sx={inputContainerSx}>
              <h3>Name:</h3>
              <TextInput
                label="First Name"
                type="text"
                defaultValue={firstName}
                onChangeFunction={onChangeFirstName}
              />
              <TextInput
                label="Last Name"
                type="text"
                defaultValue={lastName}
                onChangeFunction={onChangeLastName}
              />
            </Box>
            <Box sx={inputContainerSx}>
              <h3>Email:</h3>
              <TextInput
                label="Email"
                type="email"
                defaultValue={email}
                onChangeFunction={onChangeLastName}
              />
            </Box>
            <h3 className={styles.passwordTitle}>Password Change</h3>
            <Box sx={inputContainerSx}>
              {/* <h3>Old Password:</h3> */}
              <TextInput
                label="Old password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangeOldPassword}
                boxColour={passwordColour}
              />
            </Box>
            <Box sx={inputContainerSx}>
              {/* <h3>New Password:</h3> */}
              <TextInput
                label="New password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangePassword}
                boxColour={passwordColour}
              />
            </Box>
            <Box sx={inputContainerSx}>
              {/* <h3>Confirm Password:</h3> */}
              <TextInput
                label="Confirm password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangeConfirmPassword}
                boxColour={passwordColour}
              />
            </Box>
            <Box sx={saveChangesButtonSx}>
              <CustomButton
                text="Save Changes"
                onClickFunction={profileUpdateButtonHandler}
              />
            </Box>
          </Box>

        </Fade>


      </Modal>
    
    </>
  )
}
export default UpdateProfileModal;