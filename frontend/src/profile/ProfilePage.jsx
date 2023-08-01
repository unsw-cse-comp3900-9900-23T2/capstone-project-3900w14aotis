import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess, fileToDataUrl } from "../utils/helpers";
import Box from "@mui/material/Box";
// import BackButton from "../components/BackButton";
// import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import {
  profileAchievementsFetch,
  profileDetailFetch,
} from "../api/profile.js";
// import { allRatingsFetch } from "../api/rating.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import { useSelector } from "react-redux";
import { allTasksFetch } from "../api/task";
import { allProjectsFetch } from "../api/project";
import ProfileRatings from "./ProfileRatings";
import ProfileAssignedTasks from "./ProfileAssignedTasks";
import ProfileAchievements from "./ProfileAchievements";
import styles from "./styles/ProfileCard.module.css";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import CircleLoading from "../components/CircleLoading";
import { sendConnectionFetch } from "../api/connections";
import { checkPendingFetch, checkConnectionFetch } from "../api/connections";
import RemoveConnectionModal from "../components/RemoveConnectionModal";

const ProfilePage = () => {
  // Initialise profile details
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverProfileImage, setCoverProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [circleLoading, setCircleLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [authUserId, setAuthUserId] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pending, setPending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectText, setConnectText] = useState("connect");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  const profileUpdated = useSelector((state) => state.profileUpdated);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const removeConnectionModal = () => {
    setIsOpen(true);
  };

  const handleRemoveConnection = () => {
    setConnected(false);
    setConnectText("connect");
  };

  const sendConnectionHandler = async () => {
    try {
      const user = getAuth();
      const res = await sendConnectionFetch(email, user.currentUser.uid);
      if (res.detail.code === 200) {
        displaySuccess("Connection request successfully sent!");

        setPending(true);
      } else {
        displayError(`${res.detail.message}`);
      }
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const getConnectedStatus = async () => {
    try {
      const user = getAuth();

      const checkConnectedResponse = await checkConnectionFetch(
        user.currentUser.uid,
        userId
      );

      const isConnected = !!checkConnectedResponse; // Check if response is truthy (connected) or falsy (not connected)

      setConnected(isConnected);
      if (isConnected) {
        setConnectText("remove");
      }
      setCircleLoading(false);
    } catch (error) {
      displayError(error);
    }
  };

  const getPendingStatus = async () => {
    try {
      const user = getAuth();

      const checkPendingResponse = await checkPendingFetch(
        user.currentUser.uid,
        userId
      );

      const isPending = !!checkPendingResponse; // Check if response is truthy (pending) or falsy (not pending)

      setPending(isPending);
      if (isPending) {
        setConnectText("pending");
      }
      setCircleLoading(false);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    getConnectedStatus();
    getPendingStatus();
  }, [pending, connected]);

  const backButtonHandler = () => {
    try {
      navigate(-1);
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, [userId, profileUpdated]);

  // Get profile details
  const getProfileDetails = async () => {
    try {
      // TODO: Figure out which user to retrieve details for
      const profileDetailsResponse = await profileDetailFetch(userId);
      console.log(profileDetailsResponse);
      const profile = profileDetailsResponse.detail.message;
      setUserDetails(profile);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setProfileImage(profile.profileImage);
      setCoverProfileImage(profile.coverProfileImage);
      setLoading(false);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    getAchievements();
  }, []);

  // Get user achievements
  const getAchievements = async () => {
    try {
      const achievementsResponse = await profileAchievementsFetch(userId);
      const userAchievements = achievementsResponse.detail.message;
      console.log("achievements: ", userAchievements);
      setAchievements(userAchievements);
    } catch (error) {
      displayError(error);
    }
  };

  // TODO: try to remove projects and tasks fetch and instead retreive user tasks from userDetails
  // backend will need to action this.

  // Get all projects
  const getAllProjects = async (uid) => {
    const userProjectsPromise = await allProjectsFetch(uid);
    const projects = userProjectsPromise.detail.message;
    setProjects(projects);
    if (projects.length > 0) {
      // Assume that there will only be one project
      getAllTasks(projects[0], uid);
    }
  };

  // Get all tasks
  const getAllTasks = async (projectId, uid) => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const currTasks = allTasksResponse.detail.message;
      const tasks = currTasks.filter((task) =>
        task.Assignees.some((assignee) => assignee.uid === uid)
      );
      setAllTasks(tasks);
    }
  };

  useEffect(() => {
    getAllProjects(userId);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                <img
                  src={coverProfileImage}
                  alt={`${firstName} ${lastName} CP`}
                  style={{ width: "100%", height: "auto", objectFit: "fill" }}
                />
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
                  key={authUserId ? authUserId : email}
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
                <h1
                  className={styles.userName}
                >{`${firstName} ${lastName}`}</h1>
                {userId === authUserId ? <UpdateProfileModal /> : <></>}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "14%",
                }}
              >
                {userId === authUserId ? (
                  <></>
                ) : (
                  <>
                    {circleLoading ? (
                      <CircleLoading />
                    ) : (
                      <>
                        <h4 className={styles.email}>{`${email}`}</h4>
                        <CustomButton
                          text={connectText}
                          onClickFunction={
                            connected
                              ? removeConnectionModal
                              : sendConnectionHandler
                          }
                          disabled={pending}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
              <ProfileRatings />
              <ProfileAchievements achievements={achievements} />
              <ProfileAssignedTasks projectId={projects[0]} tasks={allTasks} />
            </Box>
          </Box>
        </>
      )}
      <RemoveConnectionModal
        uId={userId}
        isOpen={isOpen}
        closeModal={closeModalHandler}
        onRemoveConnection={handleRemoveConnection}
      />
    </>
  );
};
export default ProfilePage;
