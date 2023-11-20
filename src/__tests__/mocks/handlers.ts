import { http, HttpResponse, delay } from 'msw';
import { mockApiData, emptyApiData } from './mockData';

export const handlers = [
  http.get('https://www.balldontlie.io/api/v1/players/2', async () => {
    await delay(100);
    return HttpResponse.json(mockApiData!.data[1]);
  }),
  http.get('https://www.balldontlie.io/api/v1/players', async () => {
    return HttpResponse.json(mockApiData);
  }),
  http.get('https://www.balldontlie.io/api/v1/players/empty', async () => {
    return HttpResponse.json(emptyApiData);
  }),
];
