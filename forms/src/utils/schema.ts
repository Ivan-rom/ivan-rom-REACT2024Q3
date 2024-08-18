import { boolean, mixed, number, object, ref, string } from 'yup';
import { Inputs } from './types';
import { MIN_FILE_SIZE } from './constants';

export const schema = object({
  [Inputs.name]: string()
    .required('Required field')
    .matches(/^[A-Z]/, 'The first letter must be uppercase'),
  [Inputs.age]: number()
    .typeError('Must be a number')
    .required('Required field')
    .positive()
    .integer('Must be an integer'),
  [Inputs.email]: string().required('Required field').email(),
  [Inputs.password]: string()
    .required('Required field')
    .matches(
      /^(?=.*[A-Za-z])/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter',
    )
    .matches(/^(?=.*\d)/, 'Password must contain at least 1 number')
    .matches(
      /^(?=.*[@$!%*#?&])/,
      'Password must contain at least 1 special character (@$!%*#?&)',
    ),
  [Inputs.repeatPassword]: string()
    .required('Required field')
    .oneOf([ref(Inputs.password)], 'Passwords must match'),
  [Inputs.country]: string().required('Required field'),
  [Inputs.gender]: string()
    .required('Required field')
    .oneOf(['male', 'female']),
  [Inputs.termsAndConditions]: boolean().required().isTrue('Required field'),
  [Inputs.picture]: mixed<FileList>()
    .required('Required field')
    .test('Required', 'Required field', (value) => value.length > 0)
    .test(
      'fileType',
      'The file must be png or jpeg',
      (value) =>
        value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png',
    )
    .test(
      'fileSize',
      `The file must be bigger ${MIN_FILE_SIZE / 1024}KB`,
      (value) => value[0]?.size > MIN_FILE_SIZE,
    ),
}).required();
