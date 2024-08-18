import { FormEvent, useState } from 'react';
import sharedStyles from '../../shared.module.css';
import InputArea from '../../components/InputArea/InputArea';
import {
  Errors,
  InputAreaType,
  Inputs,
  InputTypes,
  RadioAreaType,
} from '../../utils/types';
import { validate } from '../../utils/validate';
import useAppDispatch from '../../hooks/useAppDispatch';
import { updateFromState } from '../../redux/formSlice/formSlice';
import { getFormDataObject } from '../../utils/getFormDataObject';
import styles from './UncontrolledFormPage.module.css';

const inputAreas: {
  [key in Inputs]: InputAreaType;
} & {
  [Inputs.gender]: RadioAreaType;
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

function UncontrolledFormPage() {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Partial<Errors>>({});
  const [buttonText, setButtonText] = useState('submit');
  const inputs: Inputs[] = Object.keys(inputAreas) as Inputs[];

  const changeButtonText = (text: string) => {
    setButtonText(text);
    setTimeout(() => {
      setButtonText('submit');
    }, 2000);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const newErrors = validate(form.elements, inputs);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      changeButtonText('error');
      return;
    }

    setErrors({});
    const formDataObject = await getFormDataObject(form.elements, inputs);
    dispatch(updateFromState(formDataObject));
    changeButtonText('success');
  };

  return (
    <section className={sharedStyles.section}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>Uncontrolled components form</h1>
        {inputs.map((name) => {
          const data = inputAreas[name];
          return (
            <InputArea
              data={data}
              name={name}
              key={name}
              error={errors[name]}
            />
          );
        })}
        <button className={sharedStyles.button}>{buttonText}</button>
      </form>
    </section>
  );
}

export default UncontrolledFormPage;
