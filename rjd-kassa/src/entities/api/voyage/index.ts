import {
  AddVoyageRequestType,
  EditVoyageRequestType,
  GetAllVoyagesRequestType,
  GetAllVoyagesResponseType,
} from '@/entities/api/voyage/types.ts';
import { Api } from '@/entities/api';

export class Voyage {
  // add new voyage (only for admin)
  public static async adminAddVoyage(data: AddVoyageRequestType) {
    const response = await Api.axios.post('voyage', data);
    return response.data;
  }

  // edit voyage (only for admin)
  public static async adminEditVoyage(data: EditVoyageRequestType) {
    const response = await Api.axios.put('voyage', data);
    return response.data;
  }

  // delete voyage (only for admin)
  public static async adminDeleteVoyage(id: number) {
    const response = await Api.axios.delete(`voyage/${id}`);
    return response.data;
  }

  // get all voyages
  public static async getAllVoyages(data: GetAllVoyagesRequestType) {
    const response = await Api.axios.get<GetAllVoyagesResponseType>('voyage', {
      params: { ...data },
    });
    return response.data;
  }
}
