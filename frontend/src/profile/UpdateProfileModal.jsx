import { Modal, Fade, Box } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProfileModal.module.css";
import TextInput from "../components/TextInput";
// import TextField from "@mui/material/TextField";
import ImageInput from "../components/ImageInput";
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { displayError, displaySuccess, fileToDataUrl } from "../utils/helpers";
import { profileDetailFetch, profileUpdateFetch } from "../api/profile.js";
import CustomButton from "../components/CustomButton";
// import ProfilePicture from "../components/ProfilePicture";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../profile/state/updateProfileAction";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const UpdateProfileModal = () => {
  // Initialise profile details
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getProfileDetails();
  }, []);

  const profileDetails = async (userId) => {
    const profileDetailsResponse = await profileDetailFetch(userId);
    // TODO: try catch?
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
    // console.log("newImage: ", newImage);
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

  // const onChangeOldPassword = (value) => setOldPassword(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Checking for dataURL
  // const isDataURL = (s) => {
  //   return !!s.match(regex);
  // }
  // const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

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
              displayError(error);
            });
        }
        // Check image files
        // If there is no image file, continue with empty string
        // If there is an image file(object), convert to dataurl
        // If there is a dataURL(string), continue with dataURL
        // console.log("profile photo image: ", profileImage);
        // const newProfileImage = ((profileImage === "" ) || (typeof(profileImage) !== "object")) ? (
        //   profileImage
        // ) : (
        //   // console.log("should call file to data url")
        //   await fileToDataUrl(profileImage)
        // );
        // console.log("new profile image: ", newProfileImage);
        // console.log("cover photos image: ", coverProfileImage);
        // const newCoverProfileImage = ((coverProfileImage === "") || typeof(coverProfileImage) !== "object") ? (
        //   coverProfileImage
        // ) : (
        //   await fileToDataUrl(coverProfileImage)
        // );
        // API call to backend
        // console.log("profile update body: ", auth.currentUser.uid, firstName, lastName, email, newProfileImage, newCoverProfileImage);
        console.log(userId, firstName, lastName, email);
        const profileUpdateFetchResponse = await profileUpdateFetch(
          userId,
          firstName,
          lastName,
          email,
          profileImage,
          coverProfileImage
          // newProfileImage,
          // newCoverProfileImage
        );
        console.log(
          "profile update fetch response: ",
          profileUpdateFetchResponse
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
    // gap: "78%",
    justifyContent: "space-between",
  };

  const inputContainerSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2%",
    margin: "5% 2% 5% 2%",
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
          // color: "#454545",
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
                <h2 className={styles.modalTitle}>Edit Profile</h2>
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
                  width={"400px"}
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
