import { useNavigate } from 'react-router-dom';
import { Auth } from '@/entities/api/auth';
import { routes } from '@/constants/routes.ts';
import styles from '@/pages/auth/login-page/styles.module.css';
import { Button, Link, TextField, Typography } from '@mui/material';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const register = async () => {
    const data = await Auth.register({ login: 'antonnnnn', password: '123456' });

    console.log(data);
  };

  const redirectToLogin = () => {
    navigate(routes.login);
  };

  return (
    <div className={styles.page}>
      <Typography variant={'h5'} className={styles.title}>
        Register
      </Typography>
      <div className={styles.inputs}>
        <TextField size={'medium'} label={'Login'} />
        <TextField size={'medium'} label={'Password'} />
      </div>
      <Button onClick={register} variant={'contained'}>
        Register
      </Button>
      <Link component="button" variant="body2" onClick={redirectToLogin}>
        Already have account?
      </Link>
    </div>
  );
};
