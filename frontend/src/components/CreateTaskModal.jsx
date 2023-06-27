import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextInput from './TextInput';
import TextBox from './TextBox';

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

const CreateTaskModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [email, setEmail] = useState('');
  const [assignees, setAssignees] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChangeTitle = (value) => setDescription(value);
  const onChangeDescription = (value) => setDescription(value);
  const onChangeEmail = (value) => setEmail(value);
  const onEnter = (key) => {
    if (key === 'Enter') {
      const input = email.trim();
      console.log('wefaw');
      if (input) {
        console.log('awefawef');
        setAssignees([...assignees, input]);
        setEmail('');
      }
    }
  };
  const handleDelete = (deleteEmail) => {
    setAssignees(assignees.filter((email) => email !== deleteEmail));
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
              <h2>Create Task</h2>
              <Icon
                icon='iconamoon:close-bold'
                onClick={handleClose}
                style={{ fontSize: '36px' }}
              />
            </Box>
            <Box sx={inputBoxStyle}>
              <Icon icon='bi:card-heading' style={{ fontSize: '50px' }} />
              <TextInput
                label='Title'
                type='title'
                placeholder='Enter Title Here'
                onChangeFunction={onChangeTitle}
              />
            </Box>
            <Box sx={inputBoxStyle}>
              <Icon
                icon='fluent:text-description-24-filled'
                style={{ fontSize: '50px' }}
              />
              <TextBox
                label='Description'
                type='description'
                placeholder='Enter Description Here'
                onChangeFunction={onChangeDescription}
                width='100%'
                maxRows={1}
              />
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon icon='octicon:people-16' style={{ fontSize: '50px' }} />
              {assignees.map((email) => (
                <Box key={email}>
                  {email}

                  <button type='button' onClick={() => handleDelete(email)}>
                    &times;
                  </button>
                </Box>
              ))}
              <TextInput
                label='Assignees'
                type='assignees'
                defaultValue={email}
                placeholder='Type An Email And Press "Enter"'
                onChangeFunction={onChangeEmail}
                onKeyDownFunction={onEnter}
              />
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon icon='mdi:calendar-outline' style={{ fontSize: '50px' }} />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Box>

            <Box sx={inputBoxStyle}>
              <Icon
                icon='zondicons:exclamation-outline'
                style={{ fontSize: '50px' }}
              />
            </Box>

            <Box>
              <Icon icon='la:tasks' style={{ fontSize: '50px' }} />
            </Box>

            <Button>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
