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
import { AdminPage } from '@/pages/admin';
import { AddNewTrainPage } from '@/pages/admin/add-new-train-page';
import { EditTrainPage } from '@/pages/admin/edit-train-page';
import { AddNewRoutePage } from '@/pages/admin/add-new-route-page';
import { EditRoutePage } from '@/pages/admin/edit-route-page';
import { AddNewVoyagePage } from '@/pages/admin/add-new-voyage-page';
import { EditVoyagePage } from '@/pages/admin/edit-voyage-page';
import { MyTicketsPage } from '@/pages/my-tickets-page';
import { EditUserPage } from '@/pages/edit-user-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route path={routes.root} element={<Navigate to={routes.main} />} />

      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path={routes.admin} element={<AdminPage />} />
        <Route path={routes.adminAddTrain} element={<AddNewTrainPage />} />
        <Route path={routes.adminEditTrain} element={<EditTrainPage />} />
        <Route path={routes.adminAddRoute} element={<AddNewRoutePage />} />
        <Route path={routes.adminEditRoute} element={<EditRoutePage />} />
        <Route path={routes.adminAddVoyage} element={<AddNewVoyagePage />} />
        <Route path={routes.adminEditVoyage} element={<EditVoyagePage />} />

        <Route path={routes.main} element={<MainPage />} />
        <Route path={routes.editUser} element={<EditUserPage />} />
        <Route path={routes.myTickets} element={<MyTicketsPage />} />
      </Route>
    </Route>,
  ),
);
