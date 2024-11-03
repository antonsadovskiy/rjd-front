import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import s from '@/pages/admin/styles.module.css';
import { Voyage } from '@/entities/api/voyage';
import { Table } from '@/shared/table';
import { useTrainsTable } from '@/hooks/useTrainsTable.ts';
import { useRoutesTable } from '@/hooks/useRoutesTable.ts';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { VoyageType } from '@/entities/api/voyage/types.ts';

export const EditVoyagePage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const state = location.state as VoyageType;

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

  const [start_date, setStartDate] = useState<Dayjs | null>(
    dayjs(state.start_date),
  );
  const [ticket_cost, setTicketCost] = useState(state.ticket_cost);

  const editVoyage = async () => {
    try {
      if (!selectedRouteId || !selectedTrainId || !start_date) {
        return;
      }

      const data = await Voyage.adminEditVoyage({
        route_id: selectedRouteId,
        train_id: selectedTrainId,
        start_date: start_date.toISOString(),
        ticket_cost,
        id: 1,
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
          onClick={editVoyage}
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
