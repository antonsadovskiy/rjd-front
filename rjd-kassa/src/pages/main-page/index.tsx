import { AxiosError } from 'axios';
import { Table } from '@/shared/table';
import { useVoyagesTable } from '@/hooks/useVoyagesTable.tsx';
import { Button } from '@mui/material';
import s from './styles.module.css';
import toast from 'react-hot-toast';
import { Ticket } from '@/entities/api/ticket';
import { routes } from '@/constants/routes.ts';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const navigate = useNavigate();

  const { rows, setSelectedRow, selectedRow, columns } = useVoyagesTable();

  const buyTicket = async () => {
    try {
      if (selectedRow) {
        const data = await Ticket.buyTicket({ voyage_id: selectedRow });

        toast.success(data.meta);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  const myTicketsNavigate = () => navigate(routes.myTickets);

  return (
    <div className={s.page}>
      <Table
        rows={rows}
        columns={columns}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
      <Button disabled={!selectedRow} onClick={buyTicket} variant={'contained'}>
        Купить билет
      </Button>
      <Button onClick={myTicketsNavigate} variant={'contained'}>
        Мои билеты
      </Button>
    </div>
  );
};
