import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constants/constants';
import { setMainLoading } from '../main/mainSlice';
import { setDetailsLoading } from '../details/detailsSlice';

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

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getItems: builder.query<
      ApiResponse,
      { searchValue: string; page: number; perPage: number }
    >({
      query: (args) => {
        const { searchValue, page, perPage } = args;
        return {
          url: '/players',
          params: {
            search: searchValue,
            page: page.toString(),
            per_page: perPage.toString(),
          },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(setMainLoading(true));
        await queryFulfilled;
        dispatch(setMainLoading(false));
      },
    }),
    getItem: builder.query<Item, string>({
      query: (id) => {
        return {
          url: `/players/${id}`,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setDetailsLoading(true));
        await queryFulfilled;
        dispatch(setDetailsLoading(false));
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = apiSlice;
