import React from 'react';
import { Box } from '@mui/material';
import Headerbar from '../components/Headerbar';
import { getAuth } from 'firebase/auth';

function ConnectionsPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      <Headerbar text='Connections' />
    </Box>
  );
}

export default ConnectionsPage;
