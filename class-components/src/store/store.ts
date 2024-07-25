import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import peopleSlice from './peopleSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    people: peopleSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
