import {
  AddRouteRequestType,
  EditRouteRequestType,
  GetAllRoutesRequestType,
  GetAllRoutesResponseType,
} from '@/entities/api/route/types.ts';
import { Api } from '@/entities/api';

export class Route {
  // add new route (only for admin)
  public static async adminAddRoute(data: AddRouteRequestType) {
    const response = await Api.axios.post('route', data);
    return response.data;
  }

  // edit route (only for admin)
  public static async adminEditRoute(data: EditRouteRequestType) {
    const response = await Api.axios.put('route', data);
    return response.data;
  }

  // delete route (only for admin)
  public static async adminDeleteRoute(id: number) {
    const response = await Api.axios.delete(`route/${id}`);
    return response.data;
  }

  // get all routes
  public static async getAllRoutes(data: GetAllRoutesRequestType) {
    const response = await Api.axios.get<GetAllRoutesResponseType>(
      'route/all',
      {
        params: { ...data },
      },
    );

    return response.data;
  }
}
