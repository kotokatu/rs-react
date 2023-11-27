import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/constants/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { setPlayers, setPlayer } from './dataSlice';

export interface ApiResponse {
  data: Item[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
}

export interface Item {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
}

export interface QueryParams {
  search: string | string[] | null;
  page: string | string[] | null;
  limit: string | string[] | null;
}

export const nbaApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPlayers: builder.query<ApiResponse, QueryParams>({
      query: (args) => {
        const { search, page, limit } = args;
        return {
          url: '/players',
          params: {
            search,
            page,
            per_page: limit,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setPlayers(data));
      },
    }),
    getPlayer: builder.query<Item, string | string[]>({
      query: (id) => {
        return {
          url: `/players/${id}`,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setPlayer(data));
      },
    }),
  }),
});

export const {
  util: { getRunningQueriesThunk },
} = nbaApi;

export const { getPlayers, getPlayer } = nbaApi.endpoints;
