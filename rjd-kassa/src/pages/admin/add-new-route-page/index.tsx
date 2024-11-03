import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import s from '@/pages/admin/styles.module.css';
import { Route } from '@/entities/api/route';

export const AddNewRoutePage = () => {
  const navigate = useNavigate();

  const [start, setStart] = useState('');
  const [finish, setFinish] = useState('');
  const [travelTime, setTravelTime] = useState(100);

  const addNewRoute = async () => {
    try {
      const data = await Route.adminAddRoute({
        finish,
        start,
        travel_time: travelTime,
      });
      toast.success(data.meta);
      navigate(-1);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !start || !finish || !travelTime;
  }, [start, finish, travelTime]);

  return (
    <div className={s.block}>
      <div className={s.card}>
        <TextField
          fullWidth
          label="Начало"
          value={start}
          onChange={(e) => setStart(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          value={finish}
          label="Конец"
          onChange={(e) => setFinish(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          label="Время в пути"
          value={travelTime}
          onChange={(e) => setTravelTime(Number(e.currentTarget.value))}
          type={'number'}
        />
        <Button
          onClick={addNewRoute}
          disabled={isButtonDisabled}
          fullWidth
          variant={'contained'}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};
