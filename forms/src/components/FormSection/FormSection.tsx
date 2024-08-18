import { FilledForm } from '../../utils/types';
import styles from './formSection.module.css';

type Props = {
  form: FilledForm;
};

function FormSection({ form }: Props) {
  return (
    <section className={styles.formSection}>
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
