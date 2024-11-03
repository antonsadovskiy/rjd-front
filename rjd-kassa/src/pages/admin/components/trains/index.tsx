import { Button, Typography } from '@mui/material';
import {
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import s from '@/pages/admin/styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Train } from '@/entities/api/train';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes.ts';
import { Table } from '@/shared/table';

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Номер', width: 150 },
  { field: 'model', headerName: 'Модель', width: 150 },
  { field: 'passengers', headerName: 'Кол-во мест', width: 150 },
  { field: 'trainType', headerName: 'Тип поезда', width: 400 },
];
export const Trains = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const fetchData = async () => {
    try {
      const dataFromTrainTypes = await Train.getTrainTypes();

      const trainTypes = dataFromTrainTypes.data.types;

      const data = await Train.getAllTrains({
        page: page + 1,
        perPage,
      });

      setRows(
        data.data.content.map((item) => {
          const trainType = trainTypes.find(
            (type) => type.id === item.train_type.id,
          );
          return { ...item, trainType: trainType?.name ?? 'Не распознан' };
        }),
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  const addNewTrainNavigate = () => navigate(routes.adminAddTrain);
  const deleteTrain = async () => {
    try {
      if (selectedRow) {
        const data = await Train.adminDeleteTrain(selectedRow);
        toast.success(data.meta);

        await fetchData();
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };
  const editTrain = () => {
    const selectedTrain = rows.find((item) => item.id === selectedRow);
    if (selectedTrain) {
      navigate(routes.adminEditTrain, { state: selectedTrain });
    }
  };
  const setPaginationModel = (newPaginationModel: GridPaginationModel) => {
    setPage(newPaginationModel.page);
    setPerPage(newPaginationModel.pageSize);
  };

  return (
    <div>
      <Typography variant={'h6'}>Действия с поездами</Typography>
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
          onClick={addNewTrainNavigate}
          color={'primary'}
          variant={'contained'}
        >
          Добавить поезд
        </Button>
        <Button
          disabled={!selectedRow}
          onClick={deleteTrain}
          color={'error'}
          variant={'contained'}
        >
          Удалить поезд
        </Button>
        <Button
          disabled={!selectedRow}
          onClick={editTrain}
          color={'warning'}
          variant={'contained'}
        >
          Редактировать поезд
        </Button>
      </div>
    </div>
  );
};
