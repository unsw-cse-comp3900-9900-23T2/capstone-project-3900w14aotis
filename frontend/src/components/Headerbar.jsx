import React from 'react';
import { Box } from '@mui/material';
import CreateTaskModal from './CreateTaskModal';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import SortTasksDropdown from './SortTasksDropdown';
import { Icon } from '@iconify/react';
import AcceptRequestModal from './AcceptRequestModal';
import SendRequestModal from './SendRequestModal';

const Headerbar = ({ text, updateQueryFunction, tasksSortFunction }) => {
  const location = useLocation();

  const handleSearchQuery = (value) => {
    updateQueryFunction(value);
  };

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
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'raleway',
            fontSize: '30px',
            marginLeft: '20px',
          }}
        >
          {text}
        </h2>
        {!location.pathname.includes('project') &&
          location.pathname.includes('tasks') && <CreateTaskModal />}
      </Box>

      {!location.pathname.includes('project') &&
        location.pathname.includes('tasks') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 2,
            }}
          >
            <SearchBar
              type='text'
              placeholder='Search tasks by name, date or ID'
              onChangeFunction={handleSearchQuery}
            />
            <SortTasksDropdown sortTasksFunction={tasksSortFunction} />
          </Box>
        )}

      {!location.pathname.includes('project') &&
        location.pathname.includes('connections') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '9%',
              marginRight: '2%',
              justifyContent: 'space-around',
            }}
          >
            <AcceptRequestModal />
            <SendRequestModal />
          </Box>
        )}
    </Box>
  );
};

export default Headerbar;
