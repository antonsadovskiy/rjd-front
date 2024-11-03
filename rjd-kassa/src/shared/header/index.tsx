import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAppStore } from '@/entities/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes.ts';
import { useCallback, useMemo } from 'react';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = useAppStore((state) => state.isAdmin);

  const isAdminPage = useMemo(() => {
    return location.pathname.includes(routes.admin);
  }, [location]);

  const navigateToAdmin = useCallback(() => {
    if (isAdminPage) {
      navigate(routes.main);
      return;
    }
    navigate(routes.admin);
  }, [navigate, isAdminPage]);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography
          sx={{ flexGrow: 1 }}
          variant="h6"
          color="inherit"
          component="div"
        >
          РЖД Касса
        </Typography>
        {isAdmin && (
          <Button onClick={navigateToAdmin} color={'inherit'}>
            {isAdminPage ? 'Назад в кассу' : 'Администрация'}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};