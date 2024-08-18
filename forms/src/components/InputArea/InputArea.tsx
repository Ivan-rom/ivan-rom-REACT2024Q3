import { ChangeEvent, FocusEvent, useState } from 'react';
import {
  InputAreaType,
  Inputs,
  InputTypes,
  RadioAreaType,
} from '../../utils/types';
import styles from './inputArea.module.css';
import sharedStyles from '../../shared.module.css';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../hooks/useAppSelector';

type Props = {
  data: InputAreaType | RadioAreaType;
  error?: string | FieldError;
  name: string;
  register?: UseFormRegisterReturn<Inputs>;
};

function InputArea({ data, error, name, register }: Props) {
  const { label, type } = data;
  const [inputValue, setInputValue] = useState('');
  const { countries } = useAppSelector((state) => state.form);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
    register?.onChange(e);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setFilteredCountries([
      ...countries.filter(
        (country) =>
          value !== '' && country.toLowerCase().startsWith(value.toLowerCase()),
      ),
    ]);
    setInputValue(value);
    register?.onChange(e);
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue(e.currentTarget.textContent!);
    setFilteredCountries([]);
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    setFilteredCountries([]);
    register?.onBlur(e);
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
            value={inputValue}
            {...register}
            onChange={changePasswordHandler}
            type={type}
            id={name}
            className={styles.input}
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
            <span>{inputValue}</span>
            <label htmlFor={name} className={sharedStyles.button}>
              Choose file
            </label>
          </div>
        );

      default:
        return (
          <input
            {...register}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={inputValue}
            type={type}
            id={name}
            className={styles.input}
          />
        );
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
        {name === Inputs.country && Boolean(filteredCountries.length) && (
          <div className={styles.autocomplete}>
            {filteredCountries.map((country) => (
              <button
                key={country}
                onMouseDown={clickHandler}
                className={styles.autocompleteButton}
                type="button"
              >
                {country}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InputArea;
