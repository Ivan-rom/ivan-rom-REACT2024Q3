import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../../helpers/interfaces';

type State = {
  searchTerm: string;
  selectedPeople: Person[];
};

const initialState: State = {
  searchTerm: '',
  selectedPeople: [],
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updateSearchTerm: (state, { payload }: { payload: string }) => {
      state.searchTerm = payload.trim();
    },

    removeSelectedPerson: (state, { payload }: { payload: string }) => {
      state.selectedPeople = state.selectedPeople.filter(
        (person) => person.url !== payload,
      );
    },

    addSelectedPerson: (state, { payload }: { payload: Person }) => {
      state.selectedPeople.push(payload);
    },

    clearSelectedPeople: (state) => {
      state.selectedPeople = [];
    },
  },
});

export const {
  updateSearchTerm,
  removeSelectedPerson,
  addSelectedPerson,
  clearSelectedPeople,
} = peopleSlice.actions;
export default peopleSlice.reducer;
