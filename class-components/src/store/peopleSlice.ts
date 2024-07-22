import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../helpers/interfaces';

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
      return { ...state, searchTerm: payload.trim() };
    },

    removeSelectedPerson: (state, { payload }: { payload: string }) => {
      const foundPersonIndex = state.selectedPeople.findIndex(
        (person) => person.url === payload,
      );

      if (foundPersonIndex === -1) return { ...state };

      const newPeople = [...state.selectedPeople];
      newPeople.splice(foundPersonIndex, 1);

      return { ...state, selectedPeople: [...newPeople] };
    },

    addSelectedPerson: (state, { payload }: { payload: Person }) => {
      const newPeople = [...state.selectedPeople];
      newPeople.push(payload);
      return { ...state, selectedPeople: [...newPeople] };
    },

    clearSelectedPeople: (state) => {
      return { ...state, selectedPeople: [] };
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
