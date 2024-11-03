import { useEffect, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Voyage } from '@/entities/api/voyage';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const columns: GridColDef[] = [
  {
    field: 'startDateToShow',
    headerName: 'Начало',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'from',
    headerName: 'Откуда',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'to',
    headerName: 'Куда',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'train_type',
    headerName: 'Тип поезда',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'train_number',
    headerName: 'Номер поезда',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'train_model',
    headerName: 'Модель поезда',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'ticket_cost',
    headerName: 'Стоимость билета',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'tickets_left',
    headerName: 'Осталось билетов',
    flex: 1,
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
];

export const useVoyagesTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const fetchData = async () => {
    try {
      const data = await Voyage.getAllVoyages({
        page: 1,
        perPage: 200,
      });

      setRows(
        data.data.content.map((item) => ({
          ...item,
          startDateToShow: dayjs(item.start_date).format('DD.MM.YYYY'),
          train_type: item.train.train_type,
          train_number: item.train.number,
          train_model: item.train.model,
        })),
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    selectedRow,
    setSelectedRow,
    rows,
    columns,
    fetchData,
  };
};
