import React from "react";
import { Box } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AssignedTaskCard from "./AssignedTaskCard";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const ProfileAssignedTasks = ({ tasks }) => {
  return (
    <>
      <Box
        sx={{
          width: '90%',
          height: '25rem',
          borderRadius: '1.25rem',
          background: '#FFF',
          boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.25)',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1%',
          }}
        >
          <h3 className={styles.statusHeading}>Assigned Tasks</h3>
        </Box>
        <PerfectScrollbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              padding: '2%',
            }}
          >
            {tasks.map((task) => {
              return (
                <AssignedTaskCard task={task}/>
              )
            })}
          </Box>
        </PerfectScrollbar>
      </Box>
    
    </>
  );
};
export default ProfileAssignedTasks;
