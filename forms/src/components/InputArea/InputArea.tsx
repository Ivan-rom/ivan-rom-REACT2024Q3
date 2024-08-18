import { ChangeEvent, useState } from 'react';
import {
  InputAreaType,
  Inputs,
  InputTypes,
  RadioAreaType,
} from '../../utils/types';
import styles from './inputArea.module.css';
import sharedStyles from '../../shared.module.css';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  data: InputAreaType | RadioAreaType;
  error?: string | FieldError;
  name: string;
  register?: UseFormRegisterReturn<Inputs>;
};

function InputArea({ data, error, name, register }: Props) {
  const { label, type } = data;
  const [value, setValue] = useState('');

  const changeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value.trim());
  };

  const getInput = () => {
    switch (type) {
      case InputTypes.radio:
        return data.values!.map((value) => (
          <div key={value}>
            <input
              {...register}
              type={type}
              name={name}
              id={`${name}-${value}`}
              value={value}
            />
            <label htmlFor={`${name}-${value}`}>{value}</label>
          </div>
        ));

      case InputTypes.password:
        return (
          <input
            value={value}
            {...register}
            onChange={(e) => {
              changeHandler(e);
              register?.onChange(e);
            }}
            type={type}
            id={name}
          />
        );

      case InputTypes.file:
        return (
          <div className={styles.fileInput}>
            <input
              {...register}
              type={type}
              id={name}
              className={styles.input}
            />
            <span>{value}</span>
            <label htmlFor={name} className={sharedStyles.button}>
              Choose file
            </label>
          </div>
        );

      default:
        return <input {...register} type={type} id={name} />;
    }
  };

  const getError = () => {
    if (typeof error === 'string') {
      return error;
    }
    return error?.message;
  };

  return (
    <>
      <div className={styles.inputArea}>
        <div className={styles.error}>{getError()}</div>
        <label htmlFor={name} className={styles.label}>
          {label}:{' '}
        </label>
        {getInput()}
      </div>
    </>
  );
}

export default InputArea;
