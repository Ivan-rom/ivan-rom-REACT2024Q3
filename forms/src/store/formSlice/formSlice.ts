import { createSlice } from '@reduxjs/toolkit';
import { FilledForm } from '../../utils/types';

type FormState = {
  filledForms: FilledForm[];
  lastAddedId: string;
  countries: string[];
};

const initialState: FormState = {
  filledForms: [],
  lastAddedId: '',
  countries: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFromState: (state, action) => {
      state.filledForms.unshift(action.payload);
      state.countries.push(action.payload.country);
      state.countries.sort();
    },
    setLastAddedId: (state, action) => {
      state.lastAddedId = action.payload;
    },
  },
});

export default formSlice.reducer;
export const { updateFromState, setLastAddedId } = formSlice.actions;
