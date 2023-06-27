import React from 'react';
import { Box } from '@mui/material';
import Headerbar from '../components/Headerbar';
import LongTaskCard from '../components/LongTaskCard';

const TasksPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      <Headerbar text='Tasks' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.19rem',
          paddingTop: '2.19rem',
        }}
      >
        <LongTaskCard
          id={'1234'}
          title={'Deliverable 1 Submission'}
          status={'TODO'}
          deadline={'10/06/2023'}
          asignees={['Eddy', 'MrCow']}
        />
        <LongTaskCard />
      </Box>
    </Box>
  );
};

export default TasksPage;
