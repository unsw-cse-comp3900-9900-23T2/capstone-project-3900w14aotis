import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Icon } from '@iconify/react';
import styles from './styles/Modal.module.css';
import ProfilePicture from './ProfilePicture';
import DeadlineBox from './DeadlineBox';

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
  justifyContent: 'flex-end',
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
  '&:hover': {
    color: '#2578e6',
    cursor: 'pointer',
  },
};
const ViewTaskModal = ({ isOpen, onClose, details }) => {
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
                <h2>{details.Title}</h2>
                <p>ID: {details.id}</p>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '120px',
                  height: '50px',
                  background:
                    details.Priority === 'Low'
                      ? '#3CE800'
                      : details.Priority === 'Medium'
                      ? '#FDFF89'
                      : details.Priority === 'High'
                      ? '#FF9534'
                      : details.Priority === 'Severe'
                      ? '#FF2121'
                      : '#FFFFFF',
                }}
              >
                <h3>{details.Priority}</h3>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon
                icon='fluent:text-description-24-filled'
                style={{ fontSize: '50px' }}
              />
              <Box>
                <h2>Description</h2>
                <p>{details.Description}</p>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='ph:star-bold' style={{ fontSize: '50px' }} />
              <Box sx={faceStyle}>
                <Icon icon='tabler:mood-happy' style={{ fontSize: '50px' }} />
                <p>Very Happy</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon
                  icon='akar-icons:face-happy'
                  style={{ fontSize: '50px' }}
                />
                <p>Happy</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon
                  icon='fa6-regular:face-tired'
                  style={{ fontSize: '50px' }}
                />
                <p>Tiring</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon
                  icon='uil:angry'
                  style={{
                    fontSize: '50px',
                  }}
                  className='emotion'
                />
                <p>Angry</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='akar-icons:face-sad' style={{ fontSize: '50px' }} />
                <p>Sad</p>
              </Box>
              <Box sx={faceStyle}>
                <Icon icon='fa-regular:sad-cry' style={{ fontSize: '50px' }} />
                <p>Very sad</p>
              </Box>
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='octicon:people-16' style={{ fontSize: '50px' }} />
              {details.Assignees &&
                details.Assignees.map((assignee, idx) => {
                  return (
                    <ProfilePicture key={idx} imgWidth={35} imgHeight={35} />
                  );
                })}
            </Box>
            <Box sx={displayBoxStyle}>
              <Icon icon='la:tasks' style={{ fontSize: '50px' }} />
              <h2>{details.Status}</h2>
            </Box>
            <DeadlineBox deadline={details.Deadline} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ViewTaskModal;
