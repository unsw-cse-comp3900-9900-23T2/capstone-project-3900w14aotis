import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInput from "./TextInput";
import TextBox from "./TextBox";
import Chip from "@mui/material/Chip";
import { displayError, displaySuccess } from "../utils/helpers";
import DropDown from "./Dropdown";
import styles from "./styles/TaskModal.module.css";
import CustomButton from "./CustomButton";
import { getAuth } from "firebase/auth";
import { createTaskFetch } from "../api/task.js";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../tasks/state/addTaskAction";

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

const inputBoxStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "30px",
};

const titleStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "78%",
};

const emailBoxStyle = {
  width: "100%",
};

const createButtonBox = {
  display: "flex",
  justifyContent: "center",
};
const CreateTaskModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChangeTitle = (value) => setTitle(value);
  const onChangeDescription = (value) => setDescription(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangePriority = (value) => setPriority(value);
  const onChangeStatus = (value) => setStatus(value);

  const { projectId } = useParams();
  const dispatch = useDispatch();

  const onEnter = (key) => {
    if (key === "Enter") {
      const input = email.trim();
      if (input) {
        if (emailValid(input)) {
          setAssignees([...assignees, input]);
          setEmail("");
        }
      }
    }
  };
  const handleDelete = (deleteEmail) => {
    setAssignees(assignees.filter((email) => email !== deleteEmail));
  };

  const emailValid = (email) => {
    let error = null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = !emailPattern.test(email);

    if (isValid) {
      error = `${email} is not a valid email address.`;
    }

    if (assignees.includes(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      displayError(`${error}`);

      return false;
    }

    return true;
  };

  const createTaskButtonHandler = async () => {
    const date = new Date(deadline);
    const convertedDeadline = date.toISOString();

    try {
      const createTaskFetchResponse = await createTaskFetch(
        projectId,
        title,
        description,
        convertedDeadline,
        assignees,
        priority,
        status
      );
      displaySuccess("Successfully created task!");
      dispatch(addTaskAction());
      handleClose();
      setAssignees([]);
      setDeadline("");
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  return (
    <div>
      <Icon
        onClick={handleOpen}
        icon="ic:round-add"
        style={{ fontSize: "50px", margin: "20px" }}
        className={styles.clickButton}
      />
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
              <h2>Create Task</h2>
              <Icon
                icon="iconamoon:close-bold"
                onClick={handleClose}
                style={{ fontSize: "36px" }}
                className={styles.clickButton}
              />
            </Box>
            <Box sx={inputBoxStyle}>
              <Icon icon="bi:card-heading" style={{ fontSize: "50px" }} />
              <TextInput
                label="Title"
                type="title"
                placeholder="Enter Title Here"
                onChangeFunction={onChangeTitle}
              />
            </Box>
            <Box sx={inputBoxStyle}>
              <Icon
                icon="fluent:text-description-24-filled"
                style={{ fontSize: "50px" }}
              />
              <TextBox
                label="Description"
                type="description"
                placeholder="Enter Description Here"
                onChangeFunction={onChangeDescription}
                width="100%"
                maxRows={1}
              />
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon icon="octicon:people-16" style={{ fontSize: "50px" }} />
              <Box sx={emailBoxStyle}>
                <TextInput
                  label="Assignees"
                  type="assignees"
                  defaultValue={email}
                  placeholder='Type An Email And Press "Enter"'
                  onChangeFunction={onChangeEmail}
                  onKeyDownFunction={onEnter}
                  emailInput={true}
                />
                {assignees.map((email) => (
                  <Chip
                    key={email}
                    style={{ margin: "10px 10px 0 0" }}
                    label={email}
                    onDelete={() => handleDelete(email)}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon
                icon="zondicons:exclamation-outline"
                style={{ fontSize: "50px" }}
              />
              <DropDown
                label="Priority"
                options={["Low", "Medium", "High", "Severe"]}
                onChangeFunction={onChangePriority}
              ></DropDown>
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon icon="la:tasks" style={{ fontSize: "50px" }} />
              <DropDown
                label="Status"
                options={["To Do", "In Progress", "Done"]}
                onChangeFunction={onChangeStatus}
              ></DropDown>
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon icon="mdi:calendar-outline" style={{ fontSize: "50px" }} />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={"Deadline"}
                  value={deadline}
                  onChange={(deadline) => setDeadline(deadline)}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={createButtonBox}>
              <CustomButton
                text="Create"
                onClickFunction={createTaskButtonHandler}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;