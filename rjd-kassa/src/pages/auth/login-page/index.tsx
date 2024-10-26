import styles from './styles.module.css';
import { Button, Link, TextField, Typography } from '@mui/material';
import { Auth } from '@/entities/api/auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes.ts';
import { useState } from 'react';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    await Auth.login({ login, password });
  };

  const redirectToRegister = () => {
    navigate(routes.register);
  };

  return (
    <div className={styles.page}>
      <Typography variant={'h5'} className={styles.title}>
        Login
      </Typography>
      <div className={styles.inputs}>
        <TextField
          size={'medium'}
          value={login}
          label={'Login'}
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <TextField
          size={'medium'}
          value={password}
          label={'Password'}
          type={'password'}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <Button
        disabled={!login || !password}
        onClick={loginHandler}
        variant={'contained'}
      >
        Login
      </Button>
      <Link component="button" variant="body2" onClick={redirectToRegister}>
        Dont have account?
      </Link>
    </div>
  );
};
