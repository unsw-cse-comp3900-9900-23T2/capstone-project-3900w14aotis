import React from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import Box from '@mui/material/Box';
import BackButton from "../components/BackButton";
import { Button } from "@mui/material";
import UpdateProfileModal from "../components/UpdateProfileModal";



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
    // flexDirection: 'column',
  }

  return (
    <>
      <Box sx={profileContainerSx}>
        <BackButton text="Back" onClickFunction={backButtonHandler}/>
        <h1>Profile Page</h1>
        {/* <Button onClick={backButtonHandler}>Go back</Button> */}
        <UpdateProfileModal />


      </Box>
    </>

  )
}
export default ProfilePage;