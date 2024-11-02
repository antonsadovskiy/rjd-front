import { useNavigate } from 'react-router-dom';
import { Auth } from '@/entities/api/auth';
import { routes } from '@/constants/routes.ts';
import styles from '@/pages/auth/login-page/styles.module.css';
import { Button, Link, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const data = await Auth.register({ login, password });
      if (data.meta) {
        toast.success(data.meta);
      }
      navigate(routes.login);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  const redirectToLogin = () => {
    navigate(routes.login);
  };

  return (
    <div className={styles.page}>
      <Typography variant={'h5'} className={styles.title}>
        Регистрация
      </Typography>
      <div className={styles.inputs}>
        <TextField
          size={'medium'}
          label={'Логин'}
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <TextField
          size={'medium'}
          type={'password'}
          label={'Пароль'}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <Button
        disabled={!login || !password}
        onClick={register}
        variant={'contained'}
      >
        Зарегистрироваться
      </Button>
      <Link component="button" variant="body2" onClick={redirectToLogin}>
        Уже есть аккаунт?
      </Link>
    </div>
  );
};
