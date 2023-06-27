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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.25)',
  p: 4,
  borderRadius: '15px',
};

const CreateTaskModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [emails, setEmails] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Icon
              icon='iconamoon:close-bold'
              onClick={handleClose}
              style={{ fontSize: '36px' }}
            />
            <Icon icon='bi:card-heading' style={{ fontSize: '36px' }} />
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Icon
              icon='fluent:text-description-24-filled'
              style={{ fontSize: '36px' }}
            />
            <Icon icon='mdi:calendar-outline' style={{ fontSize: '36px' }} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <Icon icon='octicon:people-16' style={{ fontSize: '36px' }} />
            <Icon
              icon='zondicons:exclamation-outline'
              style={{ fontSize: '36px' }}
            />
            <Button>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
