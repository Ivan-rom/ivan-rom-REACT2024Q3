import { createSlice } from '@reduxjs/toolkit';

enum Gender {
  male = 'male',
  female = 'female',
}

type FormState = {
  data: {
    name: string;
    age: string;
    email: string;
    gender: Gender | '';
    password: string;
    picture: string;
    country: string;
  };
};

const initialState: FormState = {
  data: {
    name: '',
    age: '',
    email: '',
    gender: '',
    password: '',
    picture: '',
    country: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFromState: (state, action) => {
      state.data = { ...action.payload };
    },
  },
});

export default formSlice.reducer;
export const { updateFromState } = formSlice.actions;
