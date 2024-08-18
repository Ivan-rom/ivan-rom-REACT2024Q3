import { FormEvent, useState } from 'react';
import sharedStyles from '../../shared.module.css';
import InputArea from '../../components/InputArea/InputArea';
import { Errors, Inputs } from '../../utils/types';
import { validate } from '../../utils/validate';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  setLastAddedId,
  updateFromState,
} from '../../store/formSlice/formSlice';
import { getFormDataObject } from '../../utils/getFormDataObject';
import { inputAreas } from '../../utils/inputAreas';
import { useNavigate } from 'react-router-dom';

function UncontrolledFormPage() {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Partial<Errors>>({});
  const [buttonText, setButtonText] = useState('submit');
  const navigate = useNavigate();
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
    const id = Date.now().toString();
    dispatch(updateFromState({ ...formDataObject, id }));
    dispatch(setLastAddedId(id));
    navigate('/');
  };

  return (
    <section className={sharedStyles.section}>
      <form onSubmit={submitHandler} className={sharedStyles.form}>
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
