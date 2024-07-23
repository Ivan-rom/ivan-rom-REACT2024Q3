import { Dispatch, SetStateAction } from 'react';

export type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
};

export type PersonResponse = Person & ErrorRequest;

export type PeopleResponse = {
  count: number;
  results: Person[];
} & ErrorRequest;

export type ErrorRequest = {
  detail?: 'Not found';
};

export type ThemeContextType = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
};
