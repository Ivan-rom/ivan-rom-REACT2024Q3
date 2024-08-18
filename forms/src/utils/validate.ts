import { MIN_FILE_SIZE } from './constants';
import { Errors, Inputs } from './types';

export const validate = (
  inputsFromForm: HTMLFormControlsCollection,
  inputs: Inputs[],
) => {
  const newErrors: Partial<Errors> = {};
  inputs.forEach((name) => {
    const input = inputsFromForm.namedItem(name) as HTMLInputElement;

    switch (name) {
      case Inputs.name:
        if (!input.value.match(/^[A-Z]/)) {
          newErrors.name = 'First letter must be uppercase';
        }
        break;

      case Inputs.age:
        if (isNaN(+input.value)) {
          newErrors.age = 'Must be number';
          break;
        }
        if (+input.value <= 0) {
          newErrors.age = 'Must be positive';
        }
        break;

      case Inputs.password:
        if (!input.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/)) {
          newErrors.password =
            'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character (@$!%*#?&)';
        }
        break;

      case Inputs.repeatPassword:
        if (
          input.value !==
          (inputsFromForm.namedItem(Inputs.password) as HTMLInputElement).value
        ) {
          newErrors.repeatPassword = 'Passwords must match';
        }
        break;

      case Inputs.email:
        if (!input.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          newErrors.email = 'Must be email';
        }
        break;

      case Inputs.gender:
        if (!input.value) {
          newErrors.gender = 'Must be chosen';
        }
        break;

      case Inputs.termsAndConditions:
        if (!input.checked) {
          newErrors.termsAndConditions = 'Must be checked';
        }
        break;

      case Inputs.picture:
        if (!input.value) {
          newErrors.picture = 'Choose file';
          break;
        }
        if (!input.value.toLowerCase().match(/.*\.(jpg|png)$/)) {
          newErrors.picture = 'Must be jpg or png';
          break;
        }
        if (input.files![0].size < MIN_FILE_SIZE) {
          newErrors.picture = `Must be bigger ${MIN_FILE_SIZE / 1024}KB`;
        }
        break;

      case Inputs.country:
        if (!input.value) {
          newErrors.country = 'This field if required';
        }
        break;

      default:
        break;
    }
  });
  return newErrors;
};
