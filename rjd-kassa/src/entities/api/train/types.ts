export type GetTrainTypesResponseType = {
  data: {
    types: { id: 0; name: string }[];
  };
  meta: string | null;
};

export type GetAllTrainsRequestType = {
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

export type GetAllTrainsResponseType = {
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

export type EditTrainRequestType = {
  id: number;
  number: string;
  model: string;
  passengers: number;
  train_type_id: number;
};
