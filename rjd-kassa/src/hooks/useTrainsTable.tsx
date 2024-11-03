import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Train } from '@/entities/api/train';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const columns: GridColDef[] = [
  {
    field: 'number',
    flex: 1,
    headerName: 'Номер',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'model',
    flex: 1,
    headerName: 'Модель',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'passengers',
    flex: 1,
    headerName: 'Кол-во мест',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
  {
    field: 'trainType',
    flex: 1,
    headerName: 'Тип поезда',
    disableColumnMenu: true,
    renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
  },
];

export const useTrainsTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const fetchData = async () => {
    try {
      const dataFromTrainTypes = await Train.getTrainTypes();

      const trainTypes = dataFromTrainTypes.data.types;

      const data = await Train.getAllTrains({
        page: 1,
        perPage: 200,
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
  }, []);

  return {
    columns,
    selectedRow,
    setSelectedRow,
    rows,
    fetchData,
  };
};
