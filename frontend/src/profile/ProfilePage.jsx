import React from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import Box from '@mui/material/Box';
import BackButton from "../components/BackButton";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import ProfileCard from "./ProfileCard";



const ProfilePage = () => {

  const navigate = useNavigate();

  const backButtonHandler = () => {
    try {
      navigate(-1);
    } catch (error) {
      displayError(`${error.message}`)
    }
  };

  const profileContainerSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  return (
    <>
      <Box sx={profileContainerSx}>
        <BackButton text="Back" onClickFunction={backButtonHandler}/>
        <h1>Hi Sophia!</h1>
        {/* <Button onClick={backButtonHandler}>Go back</Button> */}
        <UpdateProfileModal />
        <ProfileCard title={"Ratings"}/>
        <ProfileCard title={"Achievements"}/>
        <ProfileCard title={"Assigned Tasks"}/>
      </Box>
    </>

  )
}
export default ProfilePage;