import { Api } from '@/entities/api';

export class User {
  public static async me() {
    const response = await Api.axios.get('user/me');

    return response.data;
  }
}
