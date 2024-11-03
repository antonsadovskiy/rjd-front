import { Button, Typography } from '@mui/material';
import s from '@/pages/admin/styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Train } from '@/entities/api/train';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes.ts';
import { Table } from '@/shared/table';
import { useTrainsTable } from '@/hooks/useTrainsTable.tsx';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

export const Trains = () => {
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const { rows, setSelectedRow, selectedRow, columns, fetchData } =
    useTrainsTable();

  const addNewTrainNavigate = () => navigate(routes.adminAddTrain);

  const deleteTrain = async () => {
    try {
      setIsDeleting(true);
      if (selectedRow) {
        const data = await Train.adminDeleteTrain(selectedRow);
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

  const editTrain = () => {
    const selectedTrain = rows.find((item) => item.id === selectedRow);
    if (selectedTrain) {
      navigate(routes.adminEditTrain, { state: selectedTrain });
    }
  };

  return (
    <div>
      <Typography variant={'h6'}>Действия с поездами</Typography>
      <Table columns={columns} rows={rows} setSelectedRow={setSelectedRow} />
      <div className={s.buttons}>
        <Button
          onClick={addNewTrainNavigate}
          color={'primary'}
          variant={'contained'}
        >
          Добавить поезд
        </Button>
        <LoadingButton
          loading={isDeleting}
          disabled={!selectedRow}
          onClick={deleteTrain}
          color={'error'}
          variant={'contained'}
        >
          Удалить поезд
        </LoadingButton>
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
