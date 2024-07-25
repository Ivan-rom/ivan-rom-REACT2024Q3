import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/constants';
import { PeopleResponse, PersonResponse } from '../../helpers/interfaces';

type GetPeopleParams = {
  page: number;
  searchTerm: string;
};

export const api = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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

export const { useGetPersonQuery } = api;
export const useGetPeopleQuery = api.endpoints.getPeople.useQuery;
