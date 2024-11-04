import { useAppStore } from '@/entities/store';
import { useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import s from './styles.module.css';
import { User } from '@/entities/api/user';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

export const EditUserPage = () => {
  const user = useAppStore((state) => state.userData);
  const setUserData = useAppStore((state) => state.setUserData);
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [patronymic, setPatronymic] = useState(user.patronymic);
  const [surname, setSurname] = useState(user.surname);
  const [passportNum, setPassportNum] = useState(user.passport_num);

  const [isSaving, setIsSaving] = useState(false);

  const isButtonDisabled = useMemo(() => {
    return !name || !patronymic || !surname || !passportNum;
  }, [name, patronymic, surname, passportNum]);

  const onSave = async () => {
    if (!name || !patronymic || !surname || !passportNum) {
      return;
    }
    try {
      setIsSaving(true);
      const data = await User.edit({
        name,
        surname,
        patronymic,
        passport_num: passportNum,
      });

      const user = await User.me();
      setUserData(user.data);

      if (data.meta) {
        toast.success(data.meta);
      }
      navigate(-1);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={s.page}>
      <TextField
        label={'Фамилия'}
        value={surname}
        fullWidth
        onChange={(e) => setSurname(e.target.value)}
      />
      <TextField
        label={'Имя'}
        value={name}
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label={'Отчество'}
        fullWidth
        value={patronymic}
        onChange={(e) => setPatronymic(e.target.value)}
      />
      <TextField
        label={'Номер паспорта'}
        value={passportNum}
        fullWidth
        type="number"
        onChange={(e) => setPassportNum(e.target.value)}
      />
      <LoadingButton
        loading={isSaving}
        onClick={onSave}
        disabled={isButtonDisabled}
        fullWidth
      >
        Сохранить
      </LoadingButton>
    </div>
  );
};
