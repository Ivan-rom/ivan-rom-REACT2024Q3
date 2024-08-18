export enum InputTypes {
  text = 'text',
  number = 'number',
  file = 'file',
  email = 'email',
  password = 'password',
  radio = 'radio',
  checkbox = 'checkbox',
}

export type InputAreaType = {
  label: string;
  type: InputTypes;
  values?: string[];
};

export type RadioAreaType = InputAreaType & {
  type: InputTypes.radio;
  values: string[];
};

export enum Inputs {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  repeatPassword = 'repeatPassword',
  country = 'country',
  picture = 'picture',
  gender = 'gender',
  termsAndConditions = 'termsAndConditions',
}

export type Errors = {
  [key in Inputs]: string;
};

export enum Gender {
  male = 'male',
  female = 'female',
}

export type FilledForm = {
  name: string;
  age: string;
  email: string;
  gender: Gender;
  password: string;
  picture: string;
  country: string;
};
