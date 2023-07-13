import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { stringAvatar } from "../utils/helpers";
import { profileDetailFetch } from "../api/profile.js";
import Loading from "../components/Loading";

const ProfilePictureDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const fetchUserDetails = async (uid) => {
    const profileDetailsResponse = await profileDetailFetch(uid);
    setUserDetails(profileDetailsResponse.detail.message);
    setLoading(false);
  };

  const getUserDetails = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem("loggedIn", true);
        fetchUserDetails(user.uid);
      } else {
        // User is signed out
        localStorage.removeItem("loggedIn");
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickProfile = () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    console.log(auth.currentUser);
    navigate(`/otis/profile/${uid}`);
  };

  const logoutHandler = () => {
    const auth = getAuth();
    handleClose();
    signOut(auth);
    navigate("/login");
  };

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ marginRight: "30px" }}>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="My Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {userDetails.profileImage.length !== 0 ? (
              <Avatar
                src={userDetails.profileImage}
                sx={{ width: 50, height: 50 }}
                alt={`Your Profile`}
              />
            ) : (
              <Avatar
                src="/Default-Avatar.png"
                sx={{ width: 50, height: 50 }}
                alt={`Your Profile`}
                // {...stringAvatar(
                //   `${userDetails.firstName} ${userDetails.lastName}`
                // )}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onClickProfile}>
          <Avatar
            src="/Default-Avatar.png"
            sx={{ width: 50, height: 50 }}
            alt={`Your Profile`}
          />{" "}
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfilePictureDropdown;
