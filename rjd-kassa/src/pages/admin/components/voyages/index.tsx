import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes.ts';
import { Button, Typography } from '@mui/material';
import { Table } from '@/shared/table';
import s from '@/pages/admin/styles.module.css';
import { Voyage } from '@/entities/api/voyage';
import { useVoyagesTable } from '@/hooks/useVoyagesTable.tsx';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export const Voyages = () => {
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const { rows, setSelectedRow, selectedRow, columns, fetchData } =
    useVoyagesTable();

  const addNewVoyageNavigate = () => navigate(routes.adminAddVoyage);
  const deleteVoyage = async () => {
    try {
      setIsDeleting(true);
      if (selectedRow) {
        const data = await Voyage.adminDeleteVoyage(selectedRow);
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

  const editVoyage = () => {
    const selectedRoute = rows.find((item) => item.id === selectedRow);
    console.log(selectedRoute);
    if (selectedRoute) {
      navigate(routes.adminEditVoyage, { state: { ...selectedRoute } });
    }
  };

  return (
    <div>
      <Typography variant={'h6'}>Действия с путешествиями</Typography>
      <Table columns={columns} rows={rows} setSelectedRow={setSelectedRow} />
      <div className={s.buttons}>
        <Button
          onClick={addNewVoyageNavigate}
          color={'primary'}
          variant={'contained'}
        >
          Добавить путешествие
        </Button>
        <LoadingButton
          loading={isDeleting}
          disabled={!selectedRow}
          onClick={deleteVoyage}
          color={'error'}
          variant={'contained'}
        >
          Удалить путешествие
        </LoadingButton>
        <Button
          disabled={!selectedRow}
          onClick={editVoyage}
          color={'warning'}
          variant={'contained'}
        >
          Редактировать путешествие
        </Button>
      </div>
    </div>
  );
};
