import { http, HttpResponse, delay } from 'msw';
import mockApiData from '../_mockData';

export const handlers = [
  http.get('https://www.balldontlie.io/api/v1/players/2', async () => {
    await delay(100);
    return HttpResponse.json(mockApiData!.data[1]);
  }),
  http.get('https://www.balldontlie.io/api/v1/players/', async () => {
    await delay(100);
    return HttpResponse.json(mockApiData);
  }),
];
