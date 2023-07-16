import { Modal, Fade, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProfileModal.module.css";
import TextInput from "../components/TextInput";
import TextField from "@mui/material/TextField";
import ImageInput from "../components/ImageInput";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { displayError, displaySuccess, fileToDataUrl } from "../utils/helpers";
import { profileDetailFetch, profileUpdateFetch } from "../api/profile.js";
import CustomButton from "../components/CustomButton";
import ProfilePicture from "../components/ProfilePicture";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../profile/state/updateProfileAction";


const UpdateProfileModal = () => {
  // Initialise profile details
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");

  useEffect(() => {
    getProfileDetails();
  }, []);

  // Get profile details
  const getProfileDetails = async () => {
    try {
      const auth = getAuth();
      const profileDetailsResponse = await profileDetailFetch(
        auth.currentUser.uid
      );
      // TODO: try catch?
      const profile = profileDetailsResponse.detail.message;
      setUserDetails(profile);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setProfileImage(profile.profileImage);
      setCoverProfileImage(profile.coverProfileImage);
    } catch (error) {
      displayError(error);
    }
  };

  // TODO: pasword change -> old password needs to match
  // const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordColour, setPasswordColour] = useState("#B2B2B2");

  const [open, setOpen] = useState(false);
  const openModalHandler = () => {
    getProfileDetails();
    setOpen(true);
  };
  const closeModalHandler = () => setOpen(false);

  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangeProfileImage = (event) => {
    // Convert file input to string to store in database
    const newImage = event.target.files[0];
    setProfileImage(newImage);
  };
  const onDeleteProfileImage = () => {
    setProfileImage("");
  };
  const onChangeCoverProfileImage = (event) => {
    // Convert file input to string to store in database
    const newImage = event.target.files[0];
    setCoverProfileImage(newImage);
  };
  const onDeleteCoverProfileImage = () => {
    setCoverProfileImage("");
  };
  // const onChangeOldPassword = (value) => setOldPassword(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileUpdateButtonHandler = async () => {
    // if (oldPassword === password) {
    //   displayError("Please choose a new password!");
    // }
    if (password !== confirmPassword) {
      displayError("Passwords do not match!");
    } else {
      try {
        const auth = getAuth();
        // Update email in Firebase Auth
        updateEmail(auth.currentUser, email)
          .then()
          .catch((error) => {
            displayError(error);
          });
        // Update password in Firebase Auth
        // For the time being, the app will not require the old password to change password.
        if (password !== "") {
          updatePassword(auth.currentUser, password)
            .then(() => {
              console.log("password change success!");
              // TODO: sign user back in
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
              displayError(error);
            });
        }
        // Check image files
        const newProfileImage = profileImage === "" ? (
          ""
        ) : (
          await fileToDataUrl(profileImage)
        );
        const newCoverProfileImage = coverProfileImage === "" ? (
          ""
        ) : (
          await fileToDataUrl(coverProfileImage)
        );
        // API call to backend
        const profileUpdateFetchResponse = await profileUpdateFetch(
          auth.currentUser.uid,
          firstName,
          lastName,
          email,
          newProfileImage,
          newCoverProfileImage
        );
        console.log(profileUpdateFetchResponse);
        dispatch(updateProfileAction());
        closeModalHandler();
        displaySuccess(`Profile Updated Successfully!`);
      } catch (error) {
        displayError(`${error.message}`);
      }
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
      <Icon
        icon="mdi-light:pencil"
        style={{
          color: "#454545",
          fontSize: "36px",
          marginTop: "12%",
          marginLeft: "30px",
        }}
        className={styles.clickButton}
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
              <ImageInput
                type="PROFILE"
                userDetails={userDetails}
                width={"200px"}
                height={"200px"}
                onChangeFunction={onChangeProfileImage}
                onDeleteFunction={onDeleteProfileImage}
              />
            </Box>
            <Box sx={inputContainerSx}>
              <h3>Cover Photo:</h3>
              <ImageInput
                type="COVER"
                userDetails={userDetails}
                width={"600px"}
                height={"auto"}
                onChangeFunction={onChangeCoverProfileImage}
                onDeleteFunction={onDeleteCoverProfileImage}
              />
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
                onChangeFunction={onChangeEmail}
              />
            </Box>
            <h3 className={styles.passwordTitle}>Password Change</h3>
            {/* <Box sx={inputContainerSx}>
              <TextInput
                label="Old password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangeOldPassword}
                boxColour={passwordColour}
              />
            </Box> */}
            <Box sx={inputContainerSx}>
              <TextInput
                label="New password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangePassword}
                boxColour={passwordColour}
              />
            </Box>
            <Box sx={inputContainerSx}>
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
  );
};
export default UpdateProfileModal;
