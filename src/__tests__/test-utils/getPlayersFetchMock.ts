import { http, HttpResponse } from 'msw';
import { baseUrl } from '@/constants/constants';
import { mockApiData } from '../mocks/mockData';

export const getPlayerstHandler = () =>
  http.get(baseUrl, () => {
    HttpResponse.json(mockApiData);
  });
