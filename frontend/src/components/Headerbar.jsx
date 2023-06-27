import React from 'react';
import { Box } from '@mui/material';
import { fontSize } from '@mui/system';
import { Icon } from '@iconify/react';
import CreateTaskModal from './CreateTaskModal';

const Headerbar = ({ text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '5rem',
        background: 'rgba(49, 49, 49, 0.20)',
        position: 'sticky',
        top: '70px',
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h2
        style={{ fontFamily: 'raleway', fontSize: '30px', marginLeft: '20px' }}
      >
        {text}
      </h2>

      <CreateTaskModal />
    </Box>
  );
};

export default Headerbar;
