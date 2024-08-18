import { ChangeEvent, useState } from 'react';
import { InputAreaType, InputTypes, RadioAreaType } from '../../utils/types';
import styles from './inputArea.module.css';
import sharedStyles from '../../shared.module.css';

type Props = {
  data: InputAreaType | RadioAreaType;
  error?: string;
  name: string;
};

function InputArea({ data, error, name }: Props) {
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
            onChange={changeHandler}
            type={type}
            name={name}
            id={name}
          />
        );

      case InputTypes.file:
        return (
          <div className={styles.fileInput}>
            <input type={type} name={name} id={name} className={styles.input} />
            <span>{value}</span>
            <label htmlFor={name} className={sharedStyles.button}>
              Choose file
            </label>
          </div>
        );

      default:
        return <input type={type} name={name} id={name} />;
    }
  };

  return (
    <div className={styles.inputArea}>
      <div className={styles.error}>{error}</div>
      <label htmlFor={name} className={styles.label}>
        {label}:{' '}
      </label>
      {getInput()}
    </div>
  );
}

export default InputArea;
