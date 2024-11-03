import { Api } from '@/entities/api';
import { AuthResponseType } from '@/entities/api/auth/types.ts';

export class Auth {
  public static async login(data: { login: string; password: string }) {
    const response = await Api.axios.post<AuthResponseType>('auth/login', data);

    if (response.data.data.token) {
      Api.accessToken = response.data.data.token;
    }

    return response.data;
  }
  public static async register(data: { login: string; password: string }) {
    const response = await Api.axios.post<AuthResponseType>(
      'auth/register',
      data,
    );

    if (response.data.data.token) {
      Api.accessToken = response.data.data.token;
    }

    return response.data;
  }
}
