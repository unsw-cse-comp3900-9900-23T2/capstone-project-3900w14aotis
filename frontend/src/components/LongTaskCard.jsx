import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from './styles/LongTaskCard.module.css';
import ProfilePicture from './ProfilePicture';
import DeadlineBox from './DeadlineBox';
import ViewTaskModal from './ViewTaskModal';

const LongTaskCard = ({
  id,
  title,
  status,
  deadline,
  assignees,
  isModalOpen,
}) => {
  const TaskCardClick = () => {
    isModalOpen(true);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '80%',
        height: '6.6875rem',
        borderRadius: '10px',
        background: '#FFF',
        boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.25)',
        justifyContent: 'space-between',
        '&:hover': {
          background: '#adcffb',
          cursor: 'pointer',
        },
      }}
      onClick={TaskCardClick}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          justifyContent: 'center',
        }}
      >
        <Box>
          <h4 className={styles.taskTitle}>{title}</h4>
          <h6 className={styles.statusText}>{status}</h6>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          padding: '20px',
          alignItems: 'center',
        }}
      >
        <DeadlineBox deadline={deadline} />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          {assignees.map((user, idx) => {
            return <ProfilePicture imgWidth={35} imgHeight={35} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default LongTaskCard;
