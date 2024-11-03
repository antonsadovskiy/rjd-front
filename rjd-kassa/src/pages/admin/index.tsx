import s from './styles.module.css';
import { Trains } from '@/pages/admin/components/trains';
import { Routes } from '@/pages/admin/components/routes';
import { Voyages } from '@/pages/admin/components/voyages';

export const AdminPage = () => {
  return (
    <div className={s.page}>
      <Trains />
      <Routes />
      <Voyages />
    </div>
  );
};
