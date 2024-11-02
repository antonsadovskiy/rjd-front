import { Api } from '@/entities/api';
import { UserData } from '@/entities/store/userStore.ts';

export type GetUserResponseType = {
  data: UserData;
  meta: string | null;
};

export type GetUserTicketsResponseType = {
  data: {
    content: {
      start_date: string;
      train_number: string;
      from: string;
      to: string;
    }[];
    page: number;
    total_pages: number;
    perPage: number;
    totalElements: number;
  };
  meta: string;
};

type GetUserTicketsRequestType = {
  page?: number;
  perPage?: number;
  sortBy?: 'id' | 'start_date';
  sortDirection?: 'ASC' | 'DESC';
};

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
