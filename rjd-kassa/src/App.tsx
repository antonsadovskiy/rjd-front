import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import s from './App.module.css';
import { Header } from '@/shared/header';
import { useMemo } from 'react';
import { routes } from '@/constants/routes.ts';

function App() {
  const location = useLocation();

  const isAuthPage = useMemo(() => {
    return (
      location.pathname === routes.login ||
      location.pathname === routes.register
    );
  }, [location]);

  return (
    <>
      <Toaster />
      {!isAuthPage && <Header />}
      <div className={isAuthPage ? s.contentForAuth : s.content}>
        <Outlet />
        <ScrollRestoration />
      </div>
    </>
  );
}

export default App;
