import { describe, expect, it } from 'vitest';
import reducer, {
  updateSearchTerm,
  removeSelectedPerson,
  addSelectedPerson,
  clearSelectedPeople,
} from './peopleSlice';

const testPerson = {
  name: 'test name',
  height: 'test height',
  mass: 'test mass',
  gender: 'test gender',
  hair_color: 'test hair color',
  skin_color: 'test skin color',
  eye_color: 'test eye color',
  birth_year: 'test birth year',
  url: 'test/url/1/',
};

describe('People slice', () => {
  it('returns default state when passed an empty action', () => {
    const initialState = {
      searchTerm: '',
      selectedPeople: [],
    };

    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('updates search term with "updateSearchTerm" action', () => {
    const testText = 'test text';
    const action = { type: updateSearchTerm.type, payload: testText };

    const result = reducer(undefined, action);

    expect(result.searchTerm).toEqual(testText);
  });

  it('adds person in selectedPerson array with "addSelectedPerson" action', () => {
    const action = { type: addSelectedPerson.type, payload: testPerson };

    const result = reducer(undefined, action);

    expect(result.selectedPeople).toEqual([testPerson]);
  });

  it('removes person in selectedPerson array with "removeSelectedPerson" action', () => {
    const addAction = { type: addSelectedPerson.type, payload: testPerson };
    const removeAction = {
      type: removeSelectedPerson.type,
      payload: testPerson.url,
    };

    reducer(undefined, addAction);
    const result = reducer(undefined, removeAction);

    expect(result.selectedPeople).toEqual([]);
  });

  it('clears selectedPerson array with "clearSelectedPeople" action', () => {
    const addAction = { type: addSelectedPerson.type, payload: testPerson };
    const clearAction = { type: clearSelectedPeople.type };

    reducer(undefined, addAction);
    const result = reducer(undefined, clearAction);

    expect(result.selectedPeople).toEqual([]);
  });
});
