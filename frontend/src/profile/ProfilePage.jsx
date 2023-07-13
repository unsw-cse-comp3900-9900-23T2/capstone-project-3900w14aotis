import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess, fileToDataUrl } from "../utils/helpers";
import Box from "@mui/material/Box";
import BackButton from "../components/BackButton";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import ProfileCard from "./ProfileCard";
import { profileDetailFetch } from "../api/profile.js";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  // Initialise profile details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");

  const navigate = useNavigate();

  const { userId } = useParams();

  const backButtonHandler = () => {
    try {
      navigate(-1);
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  // Get profile details
  const getProfileDetails = async () => {
    try {
      const auth = getAuth();
      const profileDetailsResponse = await profileDetailFetch(userId);
      // TODO: try catch?
      const profile = profileDetailsResponse.detail.message;
      console.log(profile);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setProfileImage(profile.profileImage);
      setCoverProfileImage(profile.coverProfileImage);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "50px",
          height: "50px",
          background: "red",
          position: "absolute",
          zIndex: "1",
        }}
      >
        {/* TODO: INSERT BACK BUTTON */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "calc(100vh - 70px)",
          height: "1px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "30%",
            background: "#D9D9D9",
          }}
        >
          {coverProfileImage.length !== 0 ? (
            <img src={coverProfileImage} alt={`${firstName} ${lastName} CP`} />
          ) : (
            <img
              src="/Jira-Emblem.png"
              alt={`${firstName} ${lastName} CP`}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "3",
            background: "pink",
          }}
        >
          <Box
            sx={{
              width: "50px",
              height: "50px",
              background: "black",
              transform: "translateY(-30px)",
            }}
          >
            {/* TODO: INSERT PROFILE IMAGE HERE */}
          </Box>
          <Box>
            <h1>{`${firstName} ${lastName}`}</h1>
          </Box>
          <Box>
            <h4>{`${email}`}</h4>
          </Box>
          <Box sx={{ height: "300px" }}>LALALLA</Box>
          <Box sx={{ height: "300px" }}>LALALLA</Box>
          <Box sx={{ height: "300px" }}>LALALLA</Box>
          <Box sx={{ height: "300px" }}>LALALLA</Box>
        </Box>
      </Box>
      {/* <Box>
          <Box>
            <h1>{firstName}</h1>
            <UpdateProfileModal />
          </Box>
        </Box> */}
      {/* <BackButton text="Back" onClickFunction={backButtonHandler} />
        <Box sx={nameContainerSx}>
          <h1>{firstName}</h1>
          <UpdateProfileModal />
        </Box>
        <ProfileCard title={"Ratings"} />
        <ProfileCard title={"Achievements"} />
        <ProfileCard title={"Assigned Tasks"} /> */}
    </>
  );
};
export default ProfilePage;
