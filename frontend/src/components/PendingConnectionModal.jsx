import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import styles from "./styles/Modal.module.css";
import PendingConnectionCard from "./PendingConnectionCard";
import { pendingConnectionsFetch } from "../api/connections";
import { getAuth } from "firebase/auth";
import { displayError } from "../utils/helpers";

const PendingConnectionModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pendingConnections, setPendingConnections] = useState("");

  const getPendingConnections = async () => {
    try {
      const user = getAuth();

      const pendingConnectionsResponse = await pendingConnectionsFetch(
        user.currentUser.uid
      );

      const details = pendingConnectionsResponse.detail.message;

      setPendingConnections(details);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    getPendingConnections();
  }, []);

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "15px",
  };

  const titleStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "64%",
  };
  const requestIconStyle = {
    position: "relative",
    display: "inline-block",
  };

  const pendingRedDotStyle = {
    position: "absolute",
    top: 0,
    right: "-5px",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "50%",
  };

  return (
    <Box>
      <Box sx={requestIconStyle}>
        <Icon
          onClick={handleOpen}
          icon="fluent-mdl2:message-friend-request"
          style={{ fontSize: "45px" }}
          className={styles.clickButton}
        />
        {Array.isArray(pendingConnections) && (
          <Box sx={pendingRedDotStyle}></Box>
        )}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box sx={titleStyle}>
              <h2>Connection Request</h2>
              <Icon
                icon="iconamoon:close-bold"
                onClick={handleClose}
                style={{ fontSize: "36px" }}
                className={styles.clickButton}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {Array.isArray(pendingConnections) ? (
                pendingConnections.map((connection) => (
                  <PendingConnectionCard
                    key={connection.uid}
                    uId={connection.uid}
                    name={`${connection.firstName} ${connection.lastName}`}
                    email={connection.email}
                    closeFunction={handleClose}
                  />
                ))
              ) : (
                <p>No pending connections.</p>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PendingConnectionModal;
