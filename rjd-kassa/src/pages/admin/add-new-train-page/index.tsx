import { useEffect, useMemo, useState } from 'react';
import { Train } from '@/entities/api/train';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import s from '../styles.module.css';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AddNewTrainPage = () => {
  const navigate = useNavigate();

  const [trainTypes, setTrainTypes] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [model, setModel] = useState('');
  const [number, setNumber] = useState('');
  const [passengers, setPassengers] = useState(50);
  const [selectedTrainType, setSelectedTrainType] = useState<
    string | undefined
  >();

  const changeTrainType = (event: SelectChangeEvent) => {
    setSelectedTrainType(event.target.value);
  };

  const addNewTrain = async () => {
    try {
      const data = await Train.adminAddTrain({
        train_type_id: Number(selectedTrainType),
        model,
        number,
        passengers,
      });
      toast.success(data.meta);
      navigate(-1);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.meta);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Train.getTrainTypes();
        setTrainTypes(data.data.types);
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data.meta);
        }
      }
    };

    fetchData();
  }, []);

  const isButtonDisabled = useMemo(() => {
    return !selectedTrainType || !model || !number || !passengers;
  }, [model, number, passengers, selectedTrainType]);

  return (
    <div className={s.block}>
      <div className={s.card}>
        <TextField
          fullWidth
          label="Модель"
          value={model}
          onChange={(e) => setModel(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          value={number}
          label="Номер"
          onChange={(e) => setNumber(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          label="Количество мест"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.currentTarget.value))}
          type={'number'}
        />
        <FormControl fullWidth>
          <InputLabel>Тип поезда</InputLabel>
          <Select
            variant={'outlined'}
            value={selectedTrainType}
            label="Тип поезда"
            onChange={changeTrainType}
          >
            {trainTypes.map((type, index) => (
              <MenuItem key={index} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={addNewTrain}
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
