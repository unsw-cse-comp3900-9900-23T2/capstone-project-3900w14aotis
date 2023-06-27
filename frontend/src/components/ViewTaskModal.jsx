import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Icon } from '@iconify/react';
import styles from './styles/TaskModal.module.css';

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

const titleStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '78%',
};

const displayBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
};

const faceStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const ViewTaskModal = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle}>
            <Box sx={titleStyle}>
              <h2>View Task</h2>
              <Icon
                icon='iconamoon:close-bold'
                onClick={onClose}
                style={{ fontSize: '36px' }}
                className={styles.clickButton}
              />
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='bi:card-heading' style={{ fontSize: '50px' }} />
              <Box>
                <h2>Deliverable 3 Submission</h2>
                <p>ID: 3900</p>
              </Box>
              <Box>
                <h2>Severe</h2>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon
                icon='fluent:text-description-24-filled'
                style={{ fontSize: '50px' }}
              />
              <Box>
                <h2>Description</h2>
                <p>loream ipsum</p>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='ph:star-bold' style={{ fontSize: '50px' }} />
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Very Happy</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Happy</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Tiring</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Angry</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Sad</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Very sad</p>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='octicon:people-16' style={{ fontSize: '50px' }} />
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon
                icon='zondicons:exclamation-outline'
                style={{ fontSize: '50px' }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ViewTaskModal;
