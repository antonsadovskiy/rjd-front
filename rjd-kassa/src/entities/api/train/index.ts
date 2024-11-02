import { Api } from '@/entities/api';

type GetTrainTypesResponseType = {
  data: {
    type: { id: 0; name: string }[];
  };
  meta: string | null;
};

type GetAllTrainsRequestType = {
  page?: number;
  perPage?: number;
  sortBy?: 'name' | 'model' | 'passengers' | 'train_type' | 'id';
  sortDirection?: 'ASC' | 'DESC';
  type_id?: number;
  passengers_from?: number;
  passengers_to?: number;
  number?: string;
  model?: string;
};

type GetAllTrainsResponseType = {
  data: {
    content: {
      id: number;
      number: string;
      model: string;
      passengers: 0;
      train_type: {
        id: number;
        name: string;
      };
    }[];
    page: number;
    totalPages: number;
    perPage: number;
    totalElements: number;
  };
  meta: string | null;
};

type EditTrainRequestType = {
  id: number;
  number: string;
  model: string;
  passengers: number;
  train_type_id: number;
};

export class Train {
  public static async getTrainTypes() {
    const response =
      await Api.axios.get<GetTrainTypesResponseType>('train/type');

    return response.data;
  }

  public static async adminAddTrain(data: Omit<EditTrainRequestType, 'id'>) {
    const response = await Api.axios.post('train', data);

    return response.data;
  }

  public static async adminEditTrain(data: EditTrainRequestType) {
    const response = await Api.axios.put('train', data);
    return response.data;
  }

  public static async getAllTrains(data: GetAllTrainsRequestType) {
    const response = await Api.axios.get<GetAllTrainsResponseType>(
      'train/all',
      {
        params: { ...data },
      },
    );
    return response.data;
  }

  public static async adminDeleteTrain(id: number) {
    const response = await Api.axios.delete(`train/${id}`);

    return response.data;
  }
}
