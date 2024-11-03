import { Api } from '@/entities/api';
import {
  EditTrainRequestType,
  GetAllTrainsRequestType,
  GetAllTrainsResponseType,
  GetTrainTypesResponseType,
} from '@/entities/api/train/types.ts';

export class Train {
  // get all train types
  public static async getTrainTypes() {
    const response =
      await Api.axios.get<GetTrainTypesResponseType>('train/type');

    return response.data;
  }

  // add train (only for admin)
  public static async adminAddTrain(data: Omit<EditTrainRequestType, 'id'>) {
    const response = await Api.axios.post('train', data);

    return response.data;
  }

  // edit train (only for admin)
  public static async adminEditTrain(data: EditTrainRequestType) {
    const response = await Api.axios.put('train', data);
    return response.data;
  }

  // get all trains
  public static async getAllTrains(data: GetAllTrainsRequestType) {
    const response = await Api.axios.get<GetAllTrainsResponseType>(
      'train/all',
      {
        params: { ...data },
      },
    );
    return response.data;
  }

  // delete train (only for admin)
  public static async adminDeleteTrain(id: number) {
    const response = await Api.axios.delete(`train/${id}`);

    return response.data;
  }
}
