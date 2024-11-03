import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Route } from '@/entities/api/route';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import s from '@/pages/admin/styles.module.css';
import { Button, TextField } from '@mui/material';

export const EditRoutePage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const state = location.state as {
    id: number;
    start: string;
    finish: string;
    travel_time: number;
  };

  const [start, setStart] = useState(state.start);
  const [finish, setFinish] = useState(state.finish);
  const [travelTime, setTravelTime] = useState(state.travel_time);

  const editRoute = async () => {
    try {
      const data = await Route.adminEditRoute({
        finish,
        start,
        travel_time: travelTime,
        id: state.id,
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
          onClick={editRoute}
          disabled={isButtonDisabled}
          fullWidth
          variant={'contained'}
        >
          Редактировать
        </Button>
      </div>
    </div>
  );
};
