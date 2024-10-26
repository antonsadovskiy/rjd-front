import axios from 'axios';

export class Api {
  public static readonly axios = axios.create({
    baseURL: 'http://localhost:3000/api/',
  });
  public static accessToken?: string = undefined;

  public static setupInterceptors() {
    Api.axios.interceptors.request.use((config) => {
      if (Api.accessToken) {
        config.headers.Authorization = `Bearer ${Api.accessToken}`;
      }

      return config;
    });
  }
}
