import { configureStore } from '@reduxjs/toolkit';
import peopleSlice from './peopleSlice/peopleSlice';

export const store = configureStore({
  reducer: {
    people: peopleSlice,
  },
});

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper<AppStore>(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
