export type AddVoyageRequestType = {
  route_id: number;
  train_id: number;
  start_date: string;
  ticket_cost: number;
};

export type EditVoyageRequestType = AddVoyageRequestType & {
  id: number;
};

export type GetAllVoyagesRequestType = {
  page?: number;
  perPage?: number;
  sortBy?: 'id' | 'travel_time' | 'ticket_cost';
  sortDirection?: 'ASC' | 'DESC';
  start?: string;
  finish?: string;
  date?: string;
};

export type GetAllVoyagesResponseType = {
  data: {
    content: {
      id: number;
      start_date: string;
      train: {
        id: number;
        number: string;
        model: string;
        train_type: string;
      };
      from: string;
      to: string;
      tickets_left: number;
      tickets_cost: number;
    }[];
    page: number;
    totalPages: number;
    perPage: number;
    totalElements: number;
  };
  meta: string;
};
