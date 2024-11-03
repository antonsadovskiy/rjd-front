import {
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes.ts';
import { Button, Typography } from '@mui/material';
import { Route } from '@/entities/api/route';
import s from '@/pages/admin/styles.module.css';
import { Table } from '@/shared/table';

const columns: GridColDef[] = [
  { field: 'start', headerName: 'Начало', width: 150 },
  { field: 'finish', headerName: 'Конец', width: 150 },
  { field: 'travel_time', headerName: 'Время в пути', width: 150 },
];

export const Routes = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const fetchData = async () => {
    try {
      const data = await Route.getAllRoutes({
        page: page + 1,
        perPage,
      });

      setRows(data.data.content);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  const addNewRouteNavigate = () => navigate(routes.adminAddRoute);
  const deleteRoute = async () => {
    try {
      if (selectedRow) {
        const data = await Route.adminDeleteRoute(selectedRow);
        toast.success(data.meta);

        await fetchData();
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };
  const editRoute = () => {
    const selectedRoute = rows.find((item) => item.id === selectedRow);
    if (selectedRoute) {
      navigate(routes.adminEditRoute, { state: selectedRoute });
    }
  };
  const setPaginationModel = (newPaginationModel: GridPaginationModel) => {
    setPage(newPaginationModel.page);
    setPerPage(newPaginationModel.pageSize);
  };

  return (
    <div>
      <Typography variant={'h6'}>Действия с маршрутами</Typography>
      <Table
        columns={columns}
        rows={rows}
        setSelectedRow={setSelectedRow}
        page={page}
        perPage={perPage}
        setPaginationModel={setPaginationModel}
      />
      <div className={s.buttons}>
        <Button
          onClick={addNewRouteNavigate}
          color={'primary'}
          variant={'contained'}
        >
          Добавить маршрут
        </Button>
        <Button
          disabled={!selectedRow}
          onClick={deleteRoute}
          color={'error'}
          variant={'contained'}
        >
          Удалить маршрут
        </Button>
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
