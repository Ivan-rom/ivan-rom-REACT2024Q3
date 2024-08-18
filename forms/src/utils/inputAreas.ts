import { InputAreaType, Inputs, InputTypes, RadioAreaType } from './types';

export const inputAreas: {
  [key in Inputs]: InputAreaType | RadioAreaType;
} = {
  [Inputs.name]: {
    label: 'Name',
    type: InputTypes.text,
  },
  [Inputs.age]: {
    label: 'Age',
    type: InputTypes.number,
  },
  [Inputs.email]: {
    label: 'Email',
    type: InputTypes.email,
  },
  [Inputs.password]: {
    label: 'Password',
    type: InputTypes.password,
  },
  [Inputs.repeatPassword]: {
    label: 'Repeat password',
    type: InputTypes.password,
  },
  [Inputs.country]: {
    label: 'Country',
    type: InputTypes.text,
  },
  [Inputs.picture]: {
    label: 'Picture',
    type: InputTypes.file,
  },
  [Inputs.gender]: {
    label: 'Gender',
    type: InputTypes.radio,
    values: ['male', 'female'],
  },
  [Inputs.termsAndConditions]: {
    label: 'I agree with terms and conditions',
    type: InputTypes.checkbox,
  },
};
