import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { Train } from '@/entities/api/train';

export const MainPage = () => {
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await Train.getTrainTypes();
        console.log(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data.meta);
        }
      }
    };

    fetchMe();
  }, []);

  const addTrain = async () => {
    await Train.adminAddTrain({
      train_type_id: 1,
      model: 'assaas',
      number: '233232',
      passengers: 2,
    });
  };

  const getAll = async () => {
    const data = await Train.getAllTrains({});
    console.log(data);
  };

  return (
    <div>
      <button onClick={addTrain}>add</button>
      <button onClick={getAll}>get all</button>
    </div>
  );
};
