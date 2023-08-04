import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import styles from "../components/styles/Modal.module.css";
import DeadlineBox from "../components/DeadlineBox";
import TaskUsers from "../components/TaskUsers";
import { addRatingFetch } from "../api/rating";
import { getAuth } from "firebase/auth";
import TaskRatingIcon from "../components/tasks/TaskRatingIcon";
import { taskDetailFetch } from "../api/task";
import Loading from "../components/loaders/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteTaskConfirmation from "./DeleteTaskConfirmation";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 * This modal allows users to view a task. If viewing a task assigned to
 * yourself, users are able to add or remove a rating.
 */
const ViewTaskModal = ({
  isOpen,
  onClose,
  projectId,
  taskId,
  setRemovedTaskId,
}) => {
  const ratingMapping = [
    { mood: "Very Sad", iconName: "fa-regular:sad-cry" },
    { mood: "Sad", iconName: "akar-icons:face-sad" },
    { mood: "Neutral", iconName: "akar-icons:face-neutral" },
    { mood: "Happy", iconName: "akar-icons:face-happy" },
    { mood: "Very Happy", iconName: "tabler:mood-happy" },
  ];

  const [details, setDetails] = useState({});
  const [loadingDetail, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [ratingUpdated, setRatingUpdated] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deadline, setDeadline] = useState(new Date(0));

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const getTaskDetails = async () => {
    if (isOpen && taskId) {
      const taskDetailsResponse = await taskDetailFetch(projectId, taskId);
      if (taskDetailsResponse.detail.code === 200) {
        setDetails(taskDetailsResponse.detail.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      // User is signed in
      setUserId(user.uid);
      getTaskDetails();
    }
  }, [isOpen, ratingUpdated]);

  const deleteTaskHandler = async () => {
    setConfirmModalOpen(true);
  };

  const ratingFetch = async (uid, mood) => {
    const addRatingResponse = await addRatingFetch(
      projectId,
      taskId,
      uid,
      mood
    );
  };

  const addRatingHandler = async (mood) => {
    if (!loading && user) {
      // User is signed in
      const userId = user.uid;
      ratingFetch(userId, mood);
      setRatingUpdated(ratingUpdated + 1);
    }
  };

  const handleClose = () => {
    setConfirmModalOpen(false);
  };

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "clamp(35rem, 40vw, 45vw)",
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "15px",
    height: "clamp(400px, 70%, 550px)",
  };

  const titleStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "78%",
    justifyContent: "flex-end",
  };

  const displayBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px",
  };

  return (
    <div>
      {isOpen && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isOpen}
          onClose={onClose}
          closeAfterTransition
        >
          <Fade in={isOpen}>
            <Box sx={modalStyle}>
              <DeleteTaskConfirmation
                isOpen={confirmModalOpen}
                closeFunction={handleClose}
                taskId={taskId}
                onClose={onClose}
                setRemovedTaskId={setRemovedTaskId}
                projectId={projectId}
              />
              <PerfectScrollbar>
                <Box sx={titleStyle}>
                  <Icon
                    icon="iconamoon:close-bold"
                    onClick={onClose}
                    style={{ fontSize: "36px" }}
                    className={styles.clickButton}
                  />
                </Box>
                {loadingDetail ? (
                  <Loading />
                ) : (
                  <>
                    <Box sx={displayBoxStyle}>
                      <Icon
                        icon="bi:card-heading"
                        style={{ fontSize: "50px" }}
                      />
                      <Box>
                        <h2>{details && details.Title}</h2>
                        <p>ID: {taskId}</p>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "20px",
                          width: "120px",
                          height: "50px",
                          background: details
                            ? details.Priority === "Low"
                              ? "#3CE800"
                              : details.Priority === "Medium"
                              ? "#FDFF89"
                              : details.Priority === "High"
                              ? "#FF9534"
                              : details.Priority === "Severe"
                              ? "#FF2121"
                              : "#FFFFFF"
                            : "#FFFFF",
                        }}
                      >
                        <h3>{details && details.Priority}</h3>
                      </Box>
                    </Box>
                    <Box sx={displayBoxStyle}>
                      <Icon
                        icon="fluent:text-description-24-filled"
                        style={{ fontSize: "50px" }}
                      />
                      <Box>
                        <h2>Description</h2>
                        <p>{details && details.Description}</p>
                      </Box>
                    </Box>
                    <Box sx={displayBoxStyle}>
                      <Icon icon="ph:star-bold" style={{ fontSize: "50px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                          width: "100%",
                        }}
                      >
                        {ratingMapping.length > 0 &&
                          ratingMapping.map((rating, idx) => {
                            let rated = false;
                            if (details) {
                              const ratingList = details.Rating[rating.mood];

                              for (const userRating of ratingList) {
                                if (userRating.uid === userId) {
                                  rated = true;
                                }
                              }
                              return (
                                <TaskRatingIcon
                                  key={idx}
                                  rated={rated}
                                  iconName={rating.iconName}
                                  mood={rating.mood}
                                  addRatingFunction={addRatingHandler}
                                  userRatings={details.Rating[rating.mood]}
                                />
                              );
                            }
                          })}
                      </Box>
                    </Box>
                    <Box sx={displayBoxStyle}>
                      <Icon
                        icon="octicon:people-16"
                        style={{ fontSize: "50px" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        {details && details.Assignees && (
                          <TaskUsers assignees={details.Assignees} />
                        )}
                      </Box>
                    </Box>
                    <Box sx={displayBoxStyle}>
                      <Icon icon="la:tasks" style={{ fontSize: "50px" }} />
                      <h2>{details && details.Status}</h2>
                    </Box>
                    {details && (
                      <DeadlineBox
                        deadline={details.Deadline}
                        width={"7.4375rem"}
                        height={"2.49rem"}
                      />
                    )}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Box
                        onClick={deleteTaskHandler}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Icon
                          icon="mingcute:delete-line"
                          style={{
                            fontSize: "50px",
                          }}
                        />
                      </Box>
                    </Box>
                  </>
                )}
              </PerfectScrollbar>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default ViewTaskModal;
