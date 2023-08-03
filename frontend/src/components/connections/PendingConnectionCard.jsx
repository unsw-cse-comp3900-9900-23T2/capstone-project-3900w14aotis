import React from "react";
import Box from "@mui/material/Box";
import ProfilePicture from "../ProfilePicture";
import { Icon } from "@iconify/react";
import styles from "../styles/Modal.module.css";
import { getAuth } from "firebase/auth";
import {
  acceptConnectionFetch,
  declineConnectionFetch,
} from "../../api/connections";
import { displayError } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addConnectionAction } from "../../connections/state/addConnectionAction";
import { removeConnectionAction } from "../../connections/state/removeConnectionAction";

/**
 * This component exists on the modal showing a user's pending connections and each
 * card shows the details of pending connections.
 * These details include:
 * - Profile picture
 * - Full name
 * - Email
 * It also includes two buttons to accept or decline the connection request.
 */
const PendingConnectionCard = ({
  uId,
  firstName,
  lastName,
  email,
  profileImage,
  closeFunction,
}) => {
  const dispatch = useDispatch();

  const acceptButtonHandler = async () => {
    const user = getAuth();
    try {
      const res = await acceptConnectionFetch(user.currentUser.uid, uId);
      dispatch(addConnectionAction());
      dispatch(removeConnectionAction());
      closeFunction();
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const declineButtonHandler = async () => {
    const user = getAuth();
    try {
      const res = await declineConnectionFetch(user.currentUser.uid, uId);
      dispatch(removeConnectionAction());
      closeFunction();
    } catch (error) {
      displayError(`${error.message}`);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "15px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <ProfilePicture
        userDetails={{ uid: uId, profileImage, firstName, lastName }}
        imgWidth="50px"
        imgHeight="50px"
      />
      <Box>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{email}</p>
      </Box>

      <Box>
        <Icon
          icon="mdi:tick-circle-outline"
          className={styles.clickButton}
          style={{ fontSize: "50px" }}
          onClick={acceptButtonHandler}
        />
        <Icon
          icon="bx:x-circle"
          className={styles.clickButton}
          style={{ fontSize: "50px" }}
          onClick={declineButtonHandler}
        />
      </Box>
    </Box>
  );
};

export default PendingConnectionCard;
