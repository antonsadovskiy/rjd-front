import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import s from '@/pages/admin/styles.module.css';
import { Voyage } from '@/entities/api/voyage';
import { Table } from '@/shared/table';
import { useTrainsTable } from '@/hooks/useTrainsTable.tsx';
import { useRoutesTable } from '@/hooks/useRoutesTable.tsx';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

export const AddNewVoyagePage = () => {
  const navigate = useNavigate();

  const {
    rows: trainsRows,
    setSelectedRow: setSelectedTrainId,
    selectedRow: selectedTrainId,
    columns: trainsColumns,
  } = useTrainsTable();

  const {
    rows: routesRows,
    selectedRow: selectedRouteId,
    setSelectedRow: setSelectedRouteId,
    columns: routesColumns,
  } = useRoutesTable();

  const [start_date, setStartDate] = useState<Dayjs | null>(dayjs());
  const [ticket_cost, setTicketCost] = useState(100);

  const addNewVoyage = async () => {
    try {
      if (!selectedRouteId || !selectedTrainId || !start_date) {
        return;
      }

      const data = await Voyage.adminAddVoyage({
        route_id: selectedRouteId,
        train_id: selectedTrainId,
        start_date: start_date.toISOString(),
        ticket_cost,
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
    return !selectedRouteId || !selectedTrainId || !start_date || !ticket_cost;
  }, [selectedRouteId, selectedTrainId, start_date, ticket_cost]);

  return (
    <div className={s.addVoyageBlock}>
      <div className={s.card}>
        <Typography variant={'h6'}>Поезда</Typography>
        <Table
          minWidth={800}
          columns={trainsColumns}
          rows={trainsRows}
          setSelectedRow={setSelectedTrainId}
        />
        <Typography variant={'h6'}>Маршруты</Typography>
        <Table
          minWidth={800}
          columns={routesColumns}
          rows={routesRows}
          setSelectedRow={setSelectedRouteId}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={start_date}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Цена билета"
          value={ticket_cost}
          onChange={(e) => setTicketCost(Number(e.currentTarget.value))}
          type={'number'}
        />
        <Button
          onClick={addNewVoyage}
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
