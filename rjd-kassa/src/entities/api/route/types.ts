export type AddRouteRequestType = {
  start: string;
  finish: string;
  travel_time: number;
};

export type EditRouteRequestType = AddRouteRequestType & {
  id: number;
};

export type GetAllRoutesRequestType = {
  page?: number;
  perPage?: number;
  sortBy?: 'id' | 'start' | 'finish' | 'travel_time';
  sortDirection?: 'ASC' | 'DESC';
  start?: string;
  finish?: string;
  travel_time_from?: number;
  travel_time_to?: number;
};
export type GetAllRoutesResponseType = {
  data: {
    content: {
      id: number;
      start: string;
      finish: string;
      travel_time: number;
    }[];
    page: number;
    totalPages: number;
    perPage: number;
    totalElements: number;
  };
  meta: string | null;
};
