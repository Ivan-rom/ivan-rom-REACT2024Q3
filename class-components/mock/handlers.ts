import { http, HttpResponse } from 'msw';
import { mockedPerson } from './mockedResponses';
import { BASE_URL } from '../src/helpers/constants';

export const handlers = [
  http.get(`${BASE_URL}/people/:id`, () => {
    return HttpResponse.json(mockedPerson);
  }),

  http.get(`${BASE_URL}/people/`, () => {
    return HttpResponse.json({ count: 1, results: [mockedPerson] });
  }),
];
