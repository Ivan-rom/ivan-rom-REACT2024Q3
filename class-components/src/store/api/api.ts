import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/constants';
import { PeopleResponse, PersonResponse } from '../../helpers/interfaces';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

type GetPeopleParams = {
  page: number;
  searchTerm: string;
};

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  // according to documentation return value has to be any
  // https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering#server-side-rendering-with-nextjs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getPeople: builder.query<PeopleResponse, GetPeopleParams>({
      query: ({ page, searchTerm = '' }) =>
        `people/?page=${page}&search=${searchTerm}`,
    }),

    getPerson: builder.query<PersonResponse, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { getRunningQueriesThunk } = api.util;
export const { getPeople, getPerson } = api.endpoints;
export const useGetPeopleQuery = api.endpoints.getPeople.useQuery;
export const useGetPersonQuery = api.endpoints.getPerson.useQuery;
