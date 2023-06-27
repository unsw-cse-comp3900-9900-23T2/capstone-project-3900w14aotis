import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Headerbar from '../components/Headerbar';
import LongTaskCard from '../components/LongTaskCard';
import { useParams } from 'react-router-dom';
import { allTasksFetch } from '../api/task';
import ViewTaskModal from '../components/ViewTaskModal';
import { sortTasks } from '../utils/helpers';

const TasksPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [currTaskDetails, setCurrTaskDetails] = useState({});

  const { projectId } = useParams();

  const getAllTasks = async () => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const sortedAllTasks = sortTasks(allTasksResponse.detail.message);
      setAllTasks(sortedAllTasks);
      console.log(sortedAllTasks);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const updateModalDetails = (response, id) => {
    const taskDetails = { ...response.detail.message, ...{ id: id } };
    setCurrTaskDetails(taskDetails);
  };

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
      <ViewTaskModal
        isOpen={open}
        onClose={modalClose}
        details={currTaskDetails}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.19rem',
          paddingTop: '2.19rem',
        }}
      >
        {console.log(projectId)}
        {console.log(allTasks)}
        {allTasks.map((task, idx) => {
          return (
            <LongTaskCard
              key={idx}
              id={task.taskID}
              title={task.Title}
              status={task.Status}
              deadline={task.Deadline}
              assignees={['Eddy', 'MrCow']}
              isModalOpen={modalOpen}
              projectId={projectId}
              updateModalFunction={updateModalDetails}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TasksPage;
