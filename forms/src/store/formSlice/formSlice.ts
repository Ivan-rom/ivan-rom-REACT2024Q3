import { createSlice } from '@reduxjs/toolkit';
import { FilledForm } from '../../utils/types';

type FormState = {
  filledForms: FilledForm[];
  lastAddedId: string;
};

const initialState: FormState = {
  filledForms: [],
  lastAddedId: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFromState: (state, action) => {
      state.filledForms.unshift(action.payload);
    },
    setLastAddedId: (state, action) => {
      state.lastAddedId = action.payload;
    },
  },
});

export default formSlice.reducer;
export const { updateFromState, setLastAddedId } = formSlice.actions;
