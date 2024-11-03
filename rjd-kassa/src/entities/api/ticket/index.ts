import { Api } from '@/entities/api';

export class Ticket {
  // buy ticket
  public static async buyTicket(data: { voyage_id: number }) {
    const response = await Api.axios.post('ticket/buy', data);
    return response.data;
  }

  // print ticket
  public static async printTicket(id: number) {
    const response = await Api.axios.get(`ticket/print/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}
