import FormSection from '../../components/FormSection/FormSection';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './home.module.css';

function Home() {
  const { filledForms } = useAppSelector((state) => state.form);

  return (
    <main className={styles.home}>
      {filledForms.length ? (
        filledForms.map((form) => <FormSection form={form} key={form.id} />)
      ) : (
        <h1>You haven't submit the form yet</h1>
      )}
    </main>
  );
}

export default Home;
