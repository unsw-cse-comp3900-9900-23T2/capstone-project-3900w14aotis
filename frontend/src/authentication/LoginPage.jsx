import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from './styles/LoginPage.module.css';
import TextInput from '../components/TextInput';
import TextLink from '../components/TextLink';
import CustomButton from '../components/CustomButton';
import { loginFetch } from '../api/authentication.js';
import { useNavigate } from 'react-router-dom';
import { displayError, displaySuccess } from '../utils/helpers';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);

  const loginHandler = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/otis/dashboard');
      displaySuccess('Welcome to Otis!');
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const loginContainerSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '32.4375rem',
    height: '37.0625rem',
    borderRadius: '20px',
    background: '#FFF',
    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.25)',
  };

  const inputContainerSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '75%',
    rowGap: '30px',
  };

  return (
    <>
      <Box sx={loginContainerSx}>
        <h1 className={styles.h1Text}>Login</h1>
        <Box sx={inputContainerSx}>
          <TextInput
            label='Email'
            type='email'
            placeholder='eddyh@gmail.com'
            onChangeFunction={onChangeEmail}
          />
          <TextInput
            label='Password'
            type='password'
            placeholder='myPassword!3900'
            onChangeFunction={onChangePassword}
          />
        </Box>
        <Box
          sx={{
            marginTop: '10px',
            width: '75%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div className={styles.textLink}>
            <TextLink linkTo='/register' text='Forgot your password?' />
          </div>
        </Box>
        <CustomButton text='Log In' onClickFunction={loginHandler} />
        <div className={styles.textLinkRegister}>
          Don&apos;t have an account?{' '}
          <TextLink linkTo='/register' text='Register' />
        </div>
      </Box>
    </>
  );
};
export default LoginPage;
