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
import ProfilePicture from "../components/ProfilePicture";

const ProfilePage = () => {
  // Initialise profile details
  const [userDetails, setUserDetails] = useState({});
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
      setUserDetails(profile);
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
            height: "35%",
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
            backgroundAttachment: "fixed",
            background:
              "radial-gradient(98.88% 50% at 50% 50%,rgba(149, 195, 255, 0.9) 27.08%,rgba(38, 132, 255, 0.9) 98.44%)",
          }}
        >
          <Box
            sx={{
              marginTop: "-170px",
            }}
          >
            <ProfilePicture
              key={userId ? userId : email}
              userDetails={userDetails}
              imgWidth={"clamp(300px, 15vw, 15vw)"}
              imgHeight={"clamp(300px, 15vw, 15vw)"}
            />
          </Box>
          <Box>
            <h1>{`${firstName} ${lastName}`}</h1>
          </Box>
          <Box>
            <h4>{`${email}`}</h4>
          </Box>
          <ProfileCard title={"Ratings"} />
          <ProfileCard title={"Achievements"} />
          <ProfileCard title={"Assigned Tasks"} />
        </Box>
      </Box>
    </>
  );
};
export default ProfilePage;
