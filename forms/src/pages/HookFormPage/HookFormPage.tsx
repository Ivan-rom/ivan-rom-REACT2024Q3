import { useForm } from 'react-hook-form';
import sharedStyles from '../../shared.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { toBase64 } from '../../utils/getBase64';
import useAppDispatch from '../../hooks/useAppDispatch';
import { updateFromState } from '../../redux/formSlice/formSlice';
import { Inputs } from '../../utils/types';
import { inputAreas } from '../../utils/inputAreas';
import { schema } from '../../utils/schema';
import InputArea from '../../components/InputArea/InputArea';

type FormData = {
  name: string;
  email: string;
  gender: string;
  age: number;
  password: string;
  repeatPassword: string;
  termsAndConditions: true;
  country: string;
  picture: FileList;
};

function HookFormPage() {
  const dispatch = useAppDispatch();
  const inputs: Inputs[] = Object.keys(inputAreas) as Inputs[];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const submitHandler = async (data: FormData) => {
    const pictureBase64 = await toBase64(data.picture[0]);
    dispatch(updateFromState({ ...data, picture: pictureBase64 }));
  };

  return (
    <section className={sharedStyles.section}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={sharedStyles.form}
      >
        <h1>UseForm hook form</h1>
        {inputs.map((name) => {
          const data = inputAreas[name];
          return (
            <InputArea
              key={name}
              data={data}
              name={name}
              error={errors[name]}
              register={register(Inputs[name])}
            />
          );
        })}

        <button
          type="submit"
          className={sharedStyles.button}
          disabled={Boolean(Object.keys(errors).length)}
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default HookFormPage;
