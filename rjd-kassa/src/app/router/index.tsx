import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import App from '@/App';
import { LoginPage } from '@/pages/auth/login-page';
import { RegisterPage } from '@/pages/auth/register-page';
import { routes } from '@/constants/routes.ts';
import { PrivateRoutes } from '@/app/router/private-routes.tsx';
import { MainPage } from '@/pages/main-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route path={routes.root} element={<Navigate to={routes.main} />} />
      {/*<Route path={routes.notFound} element={<NotFoundPage />} />*/}

      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path={routes.main} element={<MainPage />} />
      </Route>
    </Route>,
  ),
);
