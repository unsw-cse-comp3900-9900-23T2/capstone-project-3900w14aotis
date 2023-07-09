import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextInput from './TextInput';
import TextBox from './TextBox';
import Chip from '@mui/material/Chip';
import { displayError, displaySuccess } from '../utils/helpers';
import DropDown from './Dropdown';
import styles from './styles/Modal.module.css';
import CustomButton from './CustomButton';
import { getAuth } from 'firebase/auth';
import { createTaskFetch } from '../api/task.js';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../tasks/state/addTaskAction';

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.25)',
  p: 4,
  borderRadius: '15px',
};

const inputBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
};

const titleStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '78%',
};

const emailBoxStyle = {
  width: '100%',
};

const createButtonBox = {
  display: 'flex',
  justifyContent: 'center',
};
const CreateTaskModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [email, setEmail] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { projectId } = useParams();
  const dispatch = useDispatch();

  const onEnter = (key) => {
    if (key === 'Enter') {
      const input = email.trim();
      if (input) {
        if (emailValid(input)) {
          setAssignees([...assignees, input]);
          setEmail('');
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

  return (
    <div>
      <Icon
        onClick={handleOpen}
        icon='fluent-mdl2:message-friend-request'
        style={{ fontSize: '45px' }}
        className={styles.clickButton}
      />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box sx={titleStyle}>
              <h2>Connection Request</h2>
              <Icon
                icon='iconamoon:close-bold'
                onClick={handleClose}
                style={{ fontSize: '36px' }}
                className={styles.clickButton}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
