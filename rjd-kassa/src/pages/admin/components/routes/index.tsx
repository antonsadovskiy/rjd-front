import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes.ts';
import { Button, Typography } from '@mui/material';
import { Route } from '@/entities/api/route';
import s from '@/pages/admin/styles.module.css';
import { Table } from '@/shared/table';
import { useRoutesTable } from '@/hooks/useRoutesTable.tsx';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export const Routes = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { selectedRow, setSelectedRow, rows, fetchData, columns } =
    useRoutesTable();

  const addNewRouteNavigate = () => navigate(routes.adminAddRoute);

  const deleteRoute = async () => {
    try {
      setIsDeleting(true);

      if (selectedRow) {
        const data = await Route.adminDeleteRoute(selectedRow);
        toast.success(data.meta);

        await fetchData();
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const editRoute = () => {
    const selectedRoute = rows.find((item) => item.id === selectedRow);
    if (selectedRoute) {
      navigate(routes.adminEditRoute, { state: selectedRoute });
    }
  };

  return (
    <div>
      <Typography variant={'h6'}>Действия с маршрутами</Typography>
      <Table columns={columns} rows={rows} setSelectedRow={setSelectedRow} />
      <div className={s.buttons}>
        <Button
          onClick={addNewRouteNavigate}
          color={'primary'}
          variant={'contained'}
        >
          Добавить маршрут
        </Button>
        <LoadingButton
          loading={isDeleting}
          disabled={!selectedRow}
          onClick={deleteRoute}
          color={'error'}
          variant={'contained'}
        >
          Удалить маршрут
        </LoadingButton>
        <Button
          disabled={!selectedRow}
          onClick={editRoute}
          color={'warning'}
          variant={'contained'}
        >
          Редактировать маршрут
        </Button>
      </div>
    </div>
  );
};
