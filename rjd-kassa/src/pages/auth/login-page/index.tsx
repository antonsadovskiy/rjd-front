import styles from './styles.module.css';
import { Button, Link, TextField, Typography } from '@mui/material';
import { Auth } from '@/entities/api/auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes.ts';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAppStore } from '@/entities/store';
import { defineIsAdmin } from '@/utils/token.service.ts';
import { User } from '@/entities/api/user';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);
  const setIsAdmin = useAppStore((state) => state.setIsAdmin);
  const setUserData = useAppStore((state) => state.setUserData);

  const loginHandler = async () => {
    try {
      const data = await Auth.login({ login, password });

      const isAdmin = defineIsAdmin(data.data.token);
      if (isAdmin) {
        setIsAdmin(true);
      }

      const user = await User.me();
      setUserData(user.data);

      if (data.meta) {
        toast.success(data.meta);
      }
      setIsLoggedIn(true);

      navigate(routes.main);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  const redirectToRegister = () => {
    navigate(routes.register);
  };

  return (
    <div className={styles.page}>
      <Typography variant={'h5'} className={styles.title}>
        Авторизация
      </Typography>
      <div className={styles.inputs}>
        <TextField
          size={'medium'}
          value={login}
          label={'Логин'}
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <TextField
          size={'medium'}
          value={password}
          label={'Пароль'}
          type={'password'}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <Button
        disabled={!login || !password}
        onClick={loginHandler}
        variant={'contained'}
      >
        Войти
      </Button>
      <Link component="button" variant="body2" onClick={redirectToRegister}>
        Нет аккаунта?
      </Link>
    </div>
  );
};
