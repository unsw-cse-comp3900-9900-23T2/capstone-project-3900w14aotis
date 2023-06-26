import React from 'react';
import { Box } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth);
    navigate('/login');
  };
  const navbarContainerSx = {
    height: '70px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const logoContainerSx = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };
  return (
    <>
      <Box sx={navbarContainerSx}>
        <Box sx={logoContainerSx}>
          <img className={styles.logo} src='/Jira-Emblem.png' alt='Otis logo' />
          <h2>Otis</h2>
        </Box>
        <ProfilePicture />
        <CustomButton text='Log out' onClickFunction={logoutHandler} />
      </Box>
    </>
  );
};
export default Navbar;
