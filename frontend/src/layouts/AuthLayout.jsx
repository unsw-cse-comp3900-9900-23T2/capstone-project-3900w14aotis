import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles/AuthLayout.module.css';
import { Container } from '@mui/material';

const AuthLayout = () => {
  const containerSx = {
    height: 'calc(100vh - 70px)',
    display: 'grid',
    placeContent: 'center',
  };

  return (
    <div className={styles.background}>
      <Container sx={containerSx}>
        <Outlet />
      </Container>
    </div>
  );
};
export default AuthLayout;
