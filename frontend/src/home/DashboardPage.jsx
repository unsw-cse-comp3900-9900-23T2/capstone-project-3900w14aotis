import React from 'react';
import { Box } from '@mui/material';
import Headerbar from '../components/Headerbar';
import { getAuth } from 'firebase/auth';

const DashboardPage = () => {
  console.log(getAuth());
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      <Headerbar text='Dashboard' />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box>IN PROGRESS:</Box>
          <Box>TO DO:</Box>
        </Box>
        <Box>Achievements</Box>
      </Box>
    </Box>
  );
};
export default DashboardPage;
