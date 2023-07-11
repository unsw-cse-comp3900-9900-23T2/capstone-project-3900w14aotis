import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import Box from '@mui/material/Box';
import BackButton from "../components/BackButton";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import ProfileCard from "./ProfileCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MDBContainer } from "mdbreact";
// import "./scrollbar.css";
import { profileDetailFetch } from "../api/profile.js";
import { getAuth } from "firebase/auth";




const ProfilePage = () => {

  const navigate = useNavigate();

  const backButtonHandler = () => {
    try {
      navigate(-1);
    } catch (error) {
      displayError(`${error.message}`)
    }
  };

  // Initialise profile details
  const [firstName, setFirstName] = useState("b");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");

  useEffect(() => {
    getProfileDetails();
  });


  // Get profile details
  const getProfileDetails = async () => {
    try {
      const auth = getAuth();
      const profileDetailsResponse = await profileDetailFetch(
        auth.currentUser.uid
      );
      // TODO: try catch?
      const profile = profileDetailsResponse.detail.message;
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setProfileImage(profile.profileImage);
      setCoverProfileImage(profile.coverProfileImage);

    } catch(error) {
      displayError(error);
    }
  };

  const profileContainerSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '75rem',
    overflowX: 'hidden',
  }

  const nameContainerSx = {
    display: 'flex',
    flexDirection: 'row',

  }

  return (
    <>
      <PerfectScrollbar>
      {/* <MDBContainer> */}

        {/* <div className="scrollbar scrollbar-frozen-dreams"> */}


        
      
        <Box sx={profileContainerSx}>
          <BackButton text="Back" onClickFunction={backButtonHandler}/>
          <Box sx={nameContainerSx}>
            <h1>{firstName}</h1>
            {/* <Button onClick={backButtonHandler}>Go back</Button> */}
            <UpdateProfileModal />
          </Box>
          <ProfileCard title={"Ratings"}/>
          <ProfileCard title={"Achievements"}/>
          <ProfileCard title={"Assigned Tasks"}/>
        </Box>

        {/* </div> */}
      </PerfectScrollbar>
      {/* </MDBContainer> */}
    </>

  )
}
export default ProfilePage;