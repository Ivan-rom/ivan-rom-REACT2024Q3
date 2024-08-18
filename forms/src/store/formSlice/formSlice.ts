import { createSlice } from '@reduxjs/toolkit';
import { FilledForm } from '../../utils/types';

type FormState = {
  filledForms: FilledForm[];
};

const initialState: FormState = {
  filledForms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFromState: (state, action) => {
      state.filledForms.push(action.payload);
    },
  },
});

export default formSlice.reducer;
export const { updateFromState } = formSlice.actions;
