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
          width: "100px",
          height: "100px",
          borderRadius: "0 0 100px 0px",
          backgroundColor: "#FFF",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          position: "absolute",
          zIndex: "1",
        }}
      >
        <Box
          onClick={backButtonHandler}
          sx={{
            width: "60px",
            position: "relative",
            top: "20px",
            left: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="45"
            viewBox="0 0 53 45"
            fill="none"
          >
            <path
              d="M26.5 11.8618V3.33142C26.4989 2.67264 26.3041 2.02893 25.9401 1.48139C25.5761 0.933847 25.0592 0.506988 24.4545 0.254601C23.8499 0.00221444 23.1845 -0.0644065 22.5422 0.0631361C21.9 0.190679 21.3096 0.506676 20.8456 0.971306L0 21.6656L20.8456 42.3565C21.1525 42.6672 21.5174 42.9137 21.9193 43.0819C22.3212 43.2501 22.7522 43.3367 23.1875 43.3367C23.6228 43.3367 24.0538 43.2501 24.4557 43.0819C24.8576 42.9137 25.2225 42.6672 25.5294 42.3565C25.8372 42.0472 26.0813 41.6798 26.2479 41.2754C26.4144 40.871 26.5001 40.4375 26.5 39.9998V31.7027C35.6094 31.9294 45.5634 33.5895 53 45V41.6665C53 26.2225 41.4062 13.5219 26.5 11.8618Z"
              fill="#454545"
            />
          </svg>
        </Box>
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
            // TODO: FEEL FREE TO CHANGE DEFAULT COVER PIC
            <img
              src="/Default-Cover.jpg"
              alt={`${firstName} ${lastName} CP`}
              style={{ width: "100%", height: "auto", objectFit: "fill" }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>{`${firstName} ${lastName}`}</h1>
            <UpdateProfileModal />
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
