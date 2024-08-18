import { useEffect, useState } from 'react';
import { FilledForm } from '../../utils/types';
import styles from './formSection.module.css';
import useAppDispatch from '../../hooks/useAppDispatch';
import { setLastAddedId } from '../../store/formSlice/formSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

type Props = {
  form: FilledForm;
};

function FormSection({ form }: Props) {
  const dispatch = useAppDispatch();
  const { lastAddedId } = useAppSelector((state) => state.form);
  const [isFresh, setIsFresh] = useState(false);

  useEffect(() => {
    if (lastAddedId === form.id) {
      setIsFresh(true);
      const timeout = setTimeout(() => {
        setIsFresh(false);
        dispatch(setLastAddedId(''));
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, lastAddedId, form.id]);

  return (
    <section className={`${styles.formSection} ${isFresh ? styles.fresh : ''}`}>
      <div>
        Name: <span>{form.name}</span>
      </div>
      <div>
        Age: <span>{form.age}</span>
      </div>
      <div>
        Email: <span>{form.email}</span>
      </div>
      <div>
        Password: <span>{form.password}</span>
      </div>
      <div>
        Gender: <span>{form.gender}</span>
      </div>
      <div>
        Country: <span>{form.country}</span>
      </div>
      <div>
        Picture:{' '}
        <span>
          <img src={form.picture} width={200} />
        </span>
      </div>
    </section>
  );
}

export default FormSection;
