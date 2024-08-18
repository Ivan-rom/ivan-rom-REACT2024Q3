import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './formSection.module.css';

function FormSection() {
  const { data } = useAppSelector((state) => state.form);
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data.name)
    return (
      <section>
        <h1>You haven't submit the form yet</h1>
      </section>
    );

  return (
    <section className={styles.formSection}>
      <div>
        Name: <span>{data.name}</span>
      </div>
      <div>
        Age: <span>{data.age}</span>
      </div>
      <div>
        Email: <span>{data.email}</span>
      </div>
      <div>
        Password: <span>{data.password}</span>
      </div>
      <div>
        Gender: <span>{data.gender}</span>
      </div>
      <div>
        Country: <span>{data.country}</span>
      </div>
      <div>
        Picture:{' '}
        <span>
          <img src={data.picture} width={200} />
        </span>
      </div>
    </section>
  );
}

export default FormSection;
