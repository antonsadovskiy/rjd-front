import { Api } from '@/entities/api';
import {
  GetUserResponseType,
  GetUserTicketsRequestType,
  GetUserTicketsResponseType,
} from '@/entities/api/user/types.ts';

export class User {
  public static async me() {
    const response = await Api.axios.get<GetUserResponseType>('user/me');

    return response.data;
  }

  public static async getTickets(data: GetUserTicketsRequestType) {
    const response = await Api.axios.get<GetUserTicketsResponseType>(
      'user/my-tickets',
      {
        params: { ...data },
      },
    );

    return response.data;
  }
}
