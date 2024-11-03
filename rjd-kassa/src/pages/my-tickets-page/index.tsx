import { Table } from '@/shared/table';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { User } from '@/entities/api/user';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import s from './styles.module.css';
import { Ticket } from '@/entities/api/ticket';
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';

const columns: GridColDef[] = [
  {
    field: 'start_date',
    flex: 1,
    headerName: 'Начало',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'train_number',
    flex: 1,
    headerName: 'Номер поезда',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'from',
    flex: 1,
    headerName: 'Откуда',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'to',
    flex: 1,
    headerName: 'Куда',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
];

export const MyTicketsPage = () => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<GridRowsProp>([]);

  const printTicket = async () => {
    if (selectedRow) {
      try {
        setLoading(true);
        const data = await Ticket.printTicket(selectedRow);

        const fileURL = URL.createObjectURL(
          new Blob([data], { type: 'application/pdf' }),
        );

        window.open(fileURL);

        URL.revokeObjectURL(fileURL);
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data.meta);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await User.getTickets({
          page: 1,
          perPage: 200,
        });

        setRows(
          data.data.content
            .filter(
              (item) =>
                item.from !== null &&
                item.to !== null &&
                item.start_date !== null &&
                item.train_number !== null &&
                item.id !== null,
            )
            .map((item) => ({
              ...item,
              start_date: dayjs(item.start_date).format('DD.MM.YYYY HH:mm'),
            })),
        );
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data.meta);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className={s.page}>
      <Table rows={rows} columns={columns} setSelectedRow={setSelectedRow} />
      <LoadingButton
        loading={loading}
        disabled={!selectedRow}
        onClick={printTicket}
        variant={'contained'}
      >
        Распечатать
      </LoadingButton>
    </div>
  );
};
