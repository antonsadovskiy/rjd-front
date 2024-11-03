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

export type GetUserTicketsRequestType = {
  page?: number;
  perPage?: number;
  sortBy?: 'id' | 'start_date';
  sortDirection?: 'ASC' | 'DESC';
};
