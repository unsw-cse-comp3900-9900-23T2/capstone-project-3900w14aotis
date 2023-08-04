import { Modal, Fade, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProfileModal.module.css";
import TextInput from "../components/form/TextInput";
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { displayError, displaySuccess, fileToDataUrl } from "../utils/helpers";
import { profileDetailFetch, profileUpdateFetch } from "../api/profile.js";
import CustomButton from "../components/buttons/CustomButton";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../profile/state/updateProfileAction";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import UploadImageButton from "./UploadImageButton";

/**
 * This is a modal that handles updating the user's profile.
 * Details to be updated include:
 * - Cover Photo
 * - Profile Photo
 * - First Name
 * - Last Name
 * - Email
 * - Password (in which you will be logged out if successful)
 */
const UpdateProfileModal = () => {
  // Initialise profile details
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");
  const [userId, setUserId] = useState("");

  const profileInput = useRef(null);
  const coverProfileInput = useRef(null);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const profileDetails = async (userId) => {
    const profileDetailsResponse = await profileDetailFetch(userId);
    const profile = profileDetailsResponse.detail.message;
    setUserDetails(profile);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setProfileImage(profile.profileImage);
    setCoverProfileImage(profile.coverProfileImage);
  };
  // Get profile details
  const getProfileDetails = async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          profileDetails(user.uid);
          setUserId(user.uid);
        }
      });
    } catch (error) {
      displayError(error);
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordColour, setPasswordColour] = useState("#B2B2B2");
  const [currPassword, setCurrPassword] = useState("");

  const [open, setOpen] = useState(false);
  const openModalHandler = () => {
    getProfileDetails();
    setOpen(true);
  };
  const closeModalHandler = () => {
    setOpen(false);
    getProfileDetails();
  };
  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangeProfileImage = async (event) => {
    // Convert file input to string to store in database
    let newImage = event.target.files[0];
    if (newImage === undefined) {
      newImage = "";
    } else {
      try {
        const fileSize = newImage.size;
        const maxSize = 1024 * 1024;
        if (fileSize > maxSize) {
          displayError("File size must be less than 1MB");
        } else {
          newImage = await fileToDataUrl(newImage);
        }
      } catch (error) {
        displayError(error.message);
      }
    }
    setProfileImage(newImage);
  };

  const onDeleteProfileImage = () => {
    setProfileImage("");
  };

  const onChangeCoverProfileImage = async (event) => {
    // Convert file input to string to store in database
    let newImage = event.target.files[0];
    if (newImage === undefined) {
      newImage = "";
    } else {
      try {
        const fileSize = newImage.size;
        const maxSize = 1024 * 1024;
        if (fileSize > maxSize) {
          displayError("File size must be less than 1MB");
        } else {
          newImage = await fileToDataUrl(newImage);
        }
      } catch (error) {
        displayError(error.message);
      }
    }
    setCoverProfileImage(newImage);
  };

  const onDeleteCoverProfileImage = () => {
    setCoverProfileImage("");
  };

  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);
  const onChangeCurrPassword = (value) => setCurrPassword(value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileUpdateButtonHandler = async () => {
    if (
      currPassword.length === 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      displayError("Please enter a new password");
      return;
    }
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
        if (password !== "") {
          const auth = getAuth();
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currPassword
          );
          const result = await reauthenticateWithCredential(
            auth.currentUser,
            credential
          );
          updatePassword(auth.currentUser, password)
            .then(() => {
              // Logs the user out of Otis.
              signOut(auth);
              navigate("/login");
            })
            .catch((error) => {
              displayError(error);
            });
        }
        const profileUpdateFetchResponse = await profileUpdateFetch(
          userId,
          firstName,
          lastName,
          email,
          profileImage,
          coverProfileImage
        );
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
    width: "clamp(35rem, 50vw, 50vw)",
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "15px",
    height: "70%",
  };

  const modalTitleSx = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const inputContainerSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2%",
    margin: "5% 2% 5% 2%",
  };

  const imageSectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    gap: "2%",
    margin: "5% 2% 5% 2%",
  };

  const saveChangesButtonSx = {
    display: "flex",
    justifyContent: "center",
  };

  const imageContainerSx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const editFileContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "10px",
  };

  return (
    <>
      <Icon
        icon="mdi-light:pencil"
        style={{
          color: "#000",
          fontSize: "36px",
          marginTop: "8%",
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
            <PerfectScrollbar>
              <Box sx={modalTitleSx}>
                <h2>Edit Profile</h2>
                <Icon
                  icon="iconamoon:close-bold"
                  onClick={closeModalHandler}
                  style={{ fontSize: "36px" }}
                  className={styles.clickButton}
                />
              </Box>
              <Box sx={imageSectionContainerSx}>
                <Box sx={modalTitleSx}>
                  <h3 className={styles.imageText}>Profile Image:</h3>
                  <Box sx={editFileContainer}>
                    <input
                      type="file"
                      name="image"
                      ref={profileInput}
                      onChange={onChangeProfileImage}
                      style={{ display: "none" }}
                    />
                    <UploadImageButton
                      fileInput={profileInput}
                      onDeleteFunction={onDeleteProfileImage}
                    />
                  </Box>
                </Box>
                <Box sx={imageContainerSx}>
                  <input
                    type="image"
                    src={profileImage ? profileImage : "/Default-Avatar.png"}
                    width={"200px"}
                    height={"200px"}
                    className={styles.profilePicture}
                    alt="Profile Picture"
                  />
                </Box>
              </Box>
              <Box sx={imageSectionContainerSx}>
                <Box sx={modalTitleSx}>
                  <h3 className={styles.imageText}>Cover Photo:</h3>
                  <Box sx={editFileContainer}>
                    <input
                      type="file"
                      name="image"
                      ref={coverProfileInput}
                      onChange={onChangeCoverProfileImage}
                      style={{ display: "none" }}
                    />
                    <UploadImageButton
                      fileInput={coverProfileInput}
                      onDeleteFunction={onDeleteCoverProfileImage}
                    />
                  </Box>
                </Box>
                <Box sx={imageContainerSx}>
                  <input
                    type="image"
                    src={
                      coverProfileImage
                        ? coverProfileImage
                        : "/Default-Cover.jpg"
                    }
                    width={"400px"}
                    height={"auto"}
                    className={styles.coverPicture}
                    alt="Cover Photo"
                  />
                </Box>
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
              <Box sx={inputContainerSx}>
                <TextInput
                  label="Current Password"
                  type="password"
                  placeholder="myPassword!3900"
                  onChangeFunction={onChangeCurrPassword}
                  boxColour={passwordColour}
                />
              </Box>
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
              <h5 className={styles.passwordSubtitle}>
                Changing your password logs you out!
              </h5>
              <Box sx={saveChangesButtonSx}>
                <CustomButton
                  text="Save Changes"
                  onClickFunction={profileUpdateButtonHandler}
                />
              </Box>
            </PerfectScrollbar>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default UpdateProfileModal;
