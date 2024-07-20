import { createSlice } from '@reduxjs/toolkit';

type State = {
  searchTerm: string;
};

const initialState: State = {
  searchTerm: '',
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updateSearchTerm: (state, { payload }: { payload: string }) => {
      return { ...state, searchTerm: payload.trim() };
    },
  },
});

export const { updateSearchTerm } = peopleSlice.actions;
export default peopleSlice.reducer;
