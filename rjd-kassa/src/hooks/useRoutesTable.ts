import { useEffect, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Route } from '@/entities/api/route';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const columns: GridColDef[] = [
  { field: 'start', flex: 1, headerName: 'Начало', width: 150 },
  { field: 'finish', flex: 1, headerName: 'Конец', width: 150 },
  {
    field: 'travelTimeToShow',
    flex: 1,
    headerName: 'Время в пути',
    width: 150,
  },
];

export const useRoutesTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const fetchData = async () => {
    try {
      const data = await Route.getAllRoutes({
        page: 1,
        perPage: 200,
      });

      setRows(
        data.data.content.map((item) => {
          const hours = Math.floor(item.travel_time / 60);
          const minutes = item.travel_time % 60;

          return {
            ...item,
            travelTimeToShow: `${hours}ч ${minutes}мин`,
          };
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
  }, []);

  return {
    rows,
    columns,
    selectedRow,
    setSelectedRow,
    fetchData,
  };
};
