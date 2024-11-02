import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';
import { Api } from '@/entities/api';

Api.setupInterceptors();

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
