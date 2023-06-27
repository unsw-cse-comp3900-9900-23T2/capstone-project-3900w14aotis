import React from 'react';
import { Box } from '@mui/material';

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: '70px',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 70px)',
        marginTop: '70px',
      }}
    >
      <Box>SIDEBAR</Box>
      <Box>SIDEBAR</Box>
    </Box>
  );
};

export default Sidebar;
